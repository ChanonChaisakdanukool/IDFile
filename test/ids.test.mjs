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
  assert.equal(ElementIds.idBegin, 'idBegin');
  assert.ok(Object.isFrozen(ElementIds));
});
