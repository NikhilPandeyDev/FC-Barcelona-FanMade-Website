import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://localhost:3101';
// Production smoke check with no provider credentials configured.
for (const path of ['/', '/matches']) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Current football data is unavailable/);
}
const squad = await fetch(`${base}/squad`);
assert.equal(squad.status, 200);
assert.match(await squad.text(), /Current squad data is unavailable/);
const missing = await fetch(`${base}/matches/fd-1001`);
assert.equal(missing.status, 200);
const html = await missing.text();
assert.match(html, /Match data is temporarily unavailable/);
assert.match(html, /Match unavailable/);
assert.doesNotMatch(html, /FOOTBALL_DATA_API_KEY|X-Auth-Token|missing_key|SYNTHETIC_TEST_TOKEN_ONLY/);
for (const path of ['/matches/fd-0', '/matches/fd-12345678901', '/matches/fd-nope', '/not-a-route']) {
  assert.equal((await fetch(`${base}${path}`)).status, 404, path);
}
console.log('PASS missing-key notices, graceful provider-detail unavailability, sanitized output and bounded invalid-ID 404s');
