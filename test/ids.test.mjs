import test from 'node:test';
import assert from 'node:assert/strict';
import { validateIds, render } from '../scripts/ids.mjs';

test('accepts initial contract', () => {
  assert.deepEqual(validateIds(['idBegin']), ['idBegin']);
});
test('rejects malformed contracts and unsafe identifiers', () => {
  for (const ids of [null, [], {}, { idBegin: 'idBegin' }, [1], [null], [{}], [''], ['bad-key'], ['class'], ['idBegin', 'idBegin']]) {
    assert.throws(() => validateIds(ids));
  }
});
test('generated constants retain the shared ID and deterministic ordering', () => {
  const outputs = render(['zebraButton', 'idBegin']);
  assert.equal(Object.keys(outputs).length, 5);
  for (const content of Object.values(outputs)) {
    assert.match(content, /idBegin/);
    assert.ok(content.indexOf('idBegin') < content.indexOf('zebraButton'));
  }
  assert.deepEqual(outputs, render(['idBegin', 'zebraButton']));
});

test('all package versions agree', async () => {
  const { readFile } = await import('node:fs/promises');
  const root = new URL('../', import.meta.url);
  const pkg = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));
  const pod = await readFile(new URL('SharedElementIds.podspec', root), 'utf8');
  const gradle = await readFile(new URL('android/build.gradle.kts', root), 'utf8');
  assert.ok(pod.includes(`s.version = '${pkg.version}'`));
  assert.ok(gradle.includes(`version = "${pkg.version}"`));
});

test('npm export imports the shared ID at runtime', async () => {
  const { ElementIds } = await import('shared-element-ids');
  const { readFile } = await import('node:fs/promises');
  const ids = validateIds(JSON.parse(await readFile(new URL('../element-ids.json', import.meta.url), 'utf8')));
  function leaves(node) {
    assert.ok(Object.isFrozen(node));
    return Object.values(node).flatMap(value => typeof value === 'string' ? [value] : leaves(value));
  }
  assert.deepEqual(leaves(ElementIds).sort(), [...ids].sort());
  assert.equal(ElementIds.authentication.login.loginPagePhoneTextField, 'loginPagePhoneTextField');
  assert.equal(ElementIds.loginPagePhoneTextField, undefined);
  assert.ok(Object.isFrozen(ElementIds));
});

test('groups preserve nested API and stable output regardless of source order', () => {
  const first = { shop: { cart: ['totalLabel', 'buyButton'] }, auth: { login: ['loginButton'] } };
  const second = { auth: { login: ['loginButton'] }, shop: { cart: ['buyButton', 'totalLabel'] } };
  assert.deepEqual(render(first), render(second));
  for (const content of Object.values(render(first))) {
    assert.match(content, /Auth|auth/);
    assert.match(content, /Cart|cart/);
    assert.match(content, /buyButton/);
  }
  assert.deepEqual(validateIds(first).sort(), ['buyButton', 'loginButton', 'totalLabel']);
});

test('rejects duplicate IDs across pages and malformed groups', () => {
  for (const contract of [
    { auth: { login: ['sameId'], otp: ['sameId'] } },
    { auth: { login: ['sameId'] }, shop: { cart: ['sameId'] } },
    { auth: {} }, { auth: [] }, { auth: { login: [] } },
    { auth: { login: 'bad' } }, { auth: { login: [123] } },
    { 'bad/name': { login: ['validId'] } },
    { auth: { 'bad\nname': ['validId'] } },
  ]) {
    assert.throws(() => render(contract));
  }
});

test('native namespace and TypeScript leaf union are generated', () => {
  const output = render({ auth: { login: ['phoneInput'] } });
  assert.match(output['generated/swift/ElementIds.swift'], /public struct Auth/);
  assert.match(output['generated/swift/ElementIds.swift'], /public struct Login/);
  assert.match(output['generated/kotlin/ElementIds.kt'], /object Auth/);
  assert.match(output['generated/typescript/elementIds.ts'], /LeafValue<typeof ElementIds>/);
  for (const name of ['class', 'self', 'constructor']) {
    assert.throws(() => render({ [name]: { login: ['phoneInput'] } }));
  }
});
