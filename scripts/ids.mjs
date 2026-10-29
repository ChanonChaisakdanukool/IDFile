import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const reserved = new Set(`class const let var function return default export import enum interface type namespace public private protected static new this super null true false switch case break continue if else for while do try catch finally throw throws extends implements package object val fun when is in as typeof void delete instanceof await yield async constructor prototype __proto__ protocol extension associatedtype typealias deinit init operator precedencegroup fileprivate internal open rethrows struct subscript actor some any defer guard repeat fallthrough where get set willSet didSet self Self Type Protocol actual abstract annotation companion crossinline data dynamic expect external final infix inline inner lateinit noinline out override reified sealed suspend tailrec vararg field it by delegate receiver param property setparam file`.split(/\s+/));

/** อ่าน feature → page → IDs; ยังรับ array เดิมเพื่อรองรับผู้เรียก generator เดิม */
function readGroups(contract) {
  if (Array.isArray(contract)) {
    return [{ name: 'shared', path: [], ids: contract }];
  }

  function requireObject(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || !Object.keys(value).length) {
      throw new Error(`${label} must be a non-empty object.`);
    }
  }

  function requireGroupName(name) {
    if (!/^[a-z][A-Za-z0-9]*$/.test(name) || reserved.has(name) || reserved.has(name[0].toUpperCase() + name.slice(1))) {
      throw new Error(`Invalid group name: ${name}. Use lowerCamelCase.`);
    }
  }

  requireObject(contract, 'ID contract');
  const groups = [];
  for (const feature of Object.keys(contract).sort()) {
    requireGroupName(feature);
    const pages = contract[feature];
    requireObject(pages, `Feature ${feature}`);
    for (const page of Object.keys(pages).sort()) {
      requireGroupName(page);
      groups.push({ name: `${feature} / ${page}`, path: [feature, page], ids: pages[page] });
    }
  }
  return groups;
}

/** ตรวจ ID รวมทุกกลุ่ม และคืน flat array สำหรับผู้ใช้ที่ต้องการรายชื่อทั้งหมด */
export function validateIds(contract) {
  const seen = new Set();
  const ids = [];
  for (const group of readGroups(contract)) {
    if (!Array.isArray(group.ids) || group.ids.length === 0) {
      throw new Error(`${group.name} must be a non-empty array of IDs.`);
    }
    for (const id of group.ids) {
      if (typeof id !== 'string' || !/^[a-z][A-Za-z0-9]*$/.test(id) || reserved.has(id)) {
        throw new Error(`Invalid ID: ${String(id)}. Use a non-reserved lowerCamelCase string.`);
      }
      if (seen.has(id)) {
        throw new Error(`Duplicate ID: ${id} in ${group.name}`);
      }
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

/** สร้าง namespace ตาม JSON โดยคงค่า string ของแต่ละ ID */
export function render(contract) {
  validateIds(contract);
  const tree = {};
  for (const group of readGroups(contract)) {
    let node = tree;
    for (const part of group.path) {
      node[part] ??= {};
      node = node[part];
    }
    for (const id of [...group.ids].sort()) node[id] = id;
  }
  const header = '// Generated from element-ids.json. Do not edit directly.\n';
  const typeName = name => name[0].toUpperCase() + name.slice(1);

  function nativeBody(node, depth, swift) {
    const indent = '    '.repeat(depth);
    return Object.entries(node).map(([name, value]) => {
      if (typeof value === 'string') {
        return `${indent}${swift ? 'public static let' : 'const val'} ${name} = "${value}"`;
      }
      const declaration = swift ? 'public struct' : 'object';
      const constructor = swift ? `${indent}    private init() {}\n` : '';
      return `${indent}${declaration} ${typeName(name)} {\n${constructor}${nativeBody(value, depth + 1, swift)}\n${indent}}`;
    }).join('\n');
  }

  function jsObject(node, depth = 0) {
    const indent = '  '.repeat(depth);
    const entries = Object.entries(node).map(([name, value]) => {
      const expression = typeof value === 'string' ? JSON.stringify(value) : jsObject(value, depth + 1);
      return `${indent}  ${name}: ${expression},`;
    });
    return `Object.freeze({\n${entries.join('\n')}\n${indent}})`;
  }

  function typeObject(node, depth = 0) {
    const indent = '  '.repeat(depth);
    const entries = Object.entries(node).map(([name, value]) => {
      const expression = typeof value === 'string' ? JSON.stringify(value) : typeObject(value, depth + 1);
      return `${indent}  readonly ${name}: ${expression};`;
    });
    return `{\n${entries.join('\n')}\n${indent}}`;
  }

  const leafType = '\ntype LeafValue<T> = T extends string ? T : { [K in keyof T]: LeafValue<T[K]> }[keyof T];\nexport type ElementId = LeafValue<typeof ElementIds>;\n';
  return {
    'dist/elementIds.js': header + `export const ElementIds = ${jsObject(tree)};\n`,
    'dist/elementIds.d.ts': header + `export declare const ElementIds: ${typeObject(tree)};\n` + leafType,
    'generated/swift/ElementIds.swift': header + 'public struct ElementIds {\n    private init() {}\n' + nativeBody(tree, 1, true) + '\n}\n',
    'generated/kotlin/ElementIds.kt': header + 'package local.shared.elementids\n\nobject ElementIds {\n' + nativeBody(tree, 1, false) + '\n}\n',
    'generated/typescript/elementIds.ts': header + `export const ElementIds = ${jsObject(tree)};\n` + leafType,
  };
}

async function main() {
  const command = process.argv[2];
  if (!['validate', 'generate', 'check'].includes(command)) throw new Error('Usage: node scripts/ids.mjs <validate|generate|check>');
  const contract = JSON.parse(await readFile(resolve(root, 'element-ids.json'), 'utf8'));
  const ids = validateIds(contract);
  if (command === 'validate') { console.log(`Valid: ${ids.length} IDs`); return; }
  for (const [relative, content] of Object.entries(render(contract))) {
    const path = resolve(root, relative);
    if (command === 'generate') {
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, content);
    } else {
      let actual;
      try { actual = await readFile(path, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (actual !== content) throw new Error(`Missing or stale: ${relative}. Run npm run generate.`);
    }
  }
  console.log(command === 'generate' ? 'Generated Swift, Kotlin and TypeScript.' : 'Generated files match the source.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
