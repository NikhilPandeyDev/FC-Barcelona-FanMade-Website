// Run against a production server: node scripts/check-squad.mjs http://localhost:3100
import assert from 'node:assert/strict';

const base = process.argv[2] ?? 'http://localhost:3100';
const home = await fetch(`${base}/`);
assert.equal(home.status, 200, 'Homepage');
const homeHtml = await home.text();
assert.match(homeHtml, /href="\/squad"/);
assert.match(homeHtml, /href="#main-content"/);
console.log('PASS /');
const hub = await fetch(`${base}/squad`);
assert.equal(hub.status, 200);
const html = await hub.text();
assert.match(html, /2024\/25/);
assert.match(html, /not the complete or current squad/);
assert.match(html, /aria-controls="squad-grid"/);
assert.equal((html.match(/aria-pressed="true"/g) ?? []).length, 1, 'One selected position filter');
const paths = [...new Set([...html.matchAll(/href="(\/squad\/[^"?#]+)"/g)].map((match) => match[1]))];
assert.equal(paths.length, 8, 'All eight curated profiles must be reachable from the hub');

for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const body = await response.text();
  assert.equal((body.match(/<h1[ >]/g) ?? []).length, 1, `${path}: one primary heading`);
  assert.match(body, /2024\/25 Player Profile/);
  assert.match(body, /Biography source/);
  assert.match(body, /not a measured heatmap/);
  assert.match(body, /Verified season statistics are not available/);
  assert.match(body, /Previous player/);
  assert.match(body, /Next player/);
  assert.match(body, /Back to squad/);
  const previous = paths[(paths.indexOf(path) - 1 + paths.length) % paths.length];
  const next = paths[(paths.indexOf(path) + 1) % paths.length];
  const playerNav = body.match(/<nav aria-label="Player navigation"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(playerNav?.includes(`href="${previous}"`), `${path}: previous destination`);
  assert.ok(playerNav?.includes(`href="${next}"`), `${path}: next destination`);
  assert.doesNotMatch(body, /radarMetrics|ratingAvg|statsSeason/, 'Unverified legacy statistics must not reach the profile payload');
  console.log(`PASS ${path}`);
}
const missing = await fetch(`${base}/squad/not-a-real-player`);
assert.equal(missing.status, 404, 'Invalid player slug');
assert.match(await missing.text(), /Pitch Position Not Found/);
console.log('PASS hub, eight profiles, metadata, data safeguards, navigation markup, and invalid-slug 404');
