import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const reserved = new Set(`class const let var function return default export import enum interface type namespace public private protected static new this super null true false switch case break continue if else for while do try catch finally throw throws extends implements package object val fun when is in as typeof void delete instanceof await yield async constructor prototype __proto__ protocol extension associatedtype typealias deinit init operator precedencegroup fileprivate internal open rethrows struct subscript actor some any defer guard repeat fallthrough where get set willSet didSet self Self Type Protocol actual abstract annotation companion crossinline data dynamic expect external final infix inline inner lateinit noinline out override reified sealed suspend tailrec vararg field it by delegate receiver param property setparam file`.split(/\s+/));

export function validateIds(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('ID file must be a non-empty JSON array of strings.');
  }
  const seen = new Set();
  for (const id of ids) {
    if (typeof id !== 'string' || !/^[a-z][A-Za-z0-9]*$/.test(id) || reserved.has(id)) {
      throw new Error(`Invalid ID: ${String(id)}. Use a non-reserved lowerCamelCase string.`);
    }
    if (seen.has(id)) throw new Error(`Duplicate ID: ${id}`);
    seen.add(id);
  }
  return ids;
}

export function render(ids) {
  validateIds(ids);
  const entries = [...ids].sort().map(id => [id, id]);
  const header = '// Generated from element-ids.json. Do not edit directly.\n';
  return {
    'dist/elementIds.js': header + 'export const ElementIds = Object.freeze({\n' + entries.map(([k,v]) => `  ${k}: "${v}",`).join('\n') + '});\n',
    'dist/elementIds.d.ts': header + 'export declare const ElementIds: {\n' + entries.map(([k,v]) => `  readonly ${k}: "${v}";`).join('\n') + '};\nexport type ElementId = (typeof ElementIds)[keyof typeof ElementIds];\n',
    'generated/swift/ElementIds.swift': header + 'public enum ElementIds {\n' + entries.map(([k,v]) => `    public static let ${k} = "${v}"`).join('\n') + '\n}\n',
    'generated/kotlin/ElementIds.kt': header + 'package local.shared.elementids\n\nobject ElementIds {\n' + entries.map(([k,v]) => `    const val ${k} = "${v}"`).join('\n') + '\n}\n',
    'generated/typescript/elementIds.ts': header + 'export const ElementIds = {\n' + entries.map(([k,v]) => `  ${k}: "${v}",`).join('\n') + '} as const;\n\nexport type ElementId = (typeof ElementIds)[keyof typeof ElementIds];\n',
  };
}

async function main() {
  const command = process.argv[2];
  if (!['validate', 'generate', 'check'].includes(command)) throw new Error('Usage: node scripts/ids.mjs <validate|generate|check>');
  const ids = validateIds(JSON.parse(await readFile(resolve(root, 'element-ids.json'), 'utf8')));
  if (command === 'validate') { console.log(`Valid: ${ids.length} IDs`); return; }
  for (const [relative, content] of Object.entries(render(ids))) {
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
