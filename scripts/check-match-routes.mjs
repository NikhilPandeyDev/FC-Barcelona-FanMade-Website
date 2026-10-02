import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://localhost:3100';
const hub = await fetch(`${base}/matches`);
assert.equal(hub.status, 200);
const html = await hub.text();
assert.match(html, /2024\/25/);
assert.match(html, /not the current schedule/);
assert.match(html, /aria-controls="match-list"/);
const paths = [...new Set([...html.matchAll(/href="(\/matches\/[^"?#]+)"/g)].map((item) => item[1]))];
assert.equal(paths.length, 3);
for (const path of paths) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const body = await response.text();
  assert.equal((body.match(/<h1[ >]/g) ?? []).length, 1);
  assert.match(body, /Back to Match Center/);
  assert.match(body, /Full time/);
  assert.match(body, /id="timeline"/);
  assert.match(body, /id="statistics"/);
  assert.match(body, /id="lineups"/);
  assert.match(body, /Historical match/);
  assert.doesNotMatch(body, /NEXT: ATALANTA|broadcastInfo/);
  console.log(`PASS ${path}`);
}
for (const path of ['/matches/not-a-real-match', '/matches/m-ucl-bayern-invalid']) {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 404);
  assert.match(await response.text(), /Pitch Position Not Found/);
}
const home = await fetch(`${base}/`);
assert.equal(home.status, 200);
const homeHtml = await home.text();
assert.match(homeHtml, /href="\/matches"/);
assert.doesNotMatch(homeHtml, /NEXT: ATALANTA|Match Preview/);
console.log('PASS Match Center hub, three details, source labels, home entry points and invalid-ID 404s');
