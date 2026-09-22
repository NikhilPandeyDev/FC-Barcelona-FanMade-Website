// Model and server-rendered state checks, not a substitute for browser QA.
// Uses the project's existing TypeScript compiler; writes no generated files.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const modules = new Map();

function load(relativePath) {
  const filename = path.resolve(root, relativePath);
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const nativeRequire = createRequire(filename);
  const localRequire = (name) => {
    if (!name.startsWith('@/') && !name.startsWith('.')) return nativeRequire(name);
    const base = name.startsWith('@/') ? path.join(root, name.slice(2)) : path.resolve(path.dirname(filename), name);
    const source = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')]
      .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    return source ? load(source) : nativeRequire(name);
  };
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  });
  new Function('require', 'module', 'exports', compiled.outputText)(localRequire, module, module.exports);
  return module.exports;
}

const { getSquadPlayers, getPlayerBySlug } = load('data/players.ts');
const { VerifiedSeasonSchema } = load('lib/schemas/squad.ts');
const { PlayerStats } = load('components/squad/PlayerStats.tsx');
const { SquadFilters } = load('components/squad/SquadFilters.tsx');
const { Button } = load('components/ui/Button.tsx');
const { getRevealAnimation } = load('lib/motion.ts');
const profiles = getSquadPlayers();
assert.equal(new Set(profiles.map((player) => player.slug)).size, 8);
assert.equal(getPlayerBySlug('not-a-real-player'), undefined);
assert.ok(profiles.every((player) => player.stats === null && !('statsSeason' in player) && !('radarMetrics' in player)));
const expectedPositions = { Goalkeeper: 1, Defender: 2, Midfielder: 2, Forward: 3 };
for (const [position, count] of Object.entries(expectedPositions)) {
  assert.equal(profiles.filter((player) => player.position === position).length, count);
}
for (const selected of ['All', ...Object.keys(expectedPositions)]) {
  const markup = renderToStaticMarkup(React.createElement(SquadFilters, { selected, onChange() {} }));
  assert.equal((markup.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.equal((markup.match(/<button /g) ?? []).length, 5);
  assert.equal((markup.match(/aria-controls="squad-grid"/g) ?? []).length, 5);
}

// Synthetic values stay exclusively in this test; no football claims are made.
const sample = { season: 'TEST', competition: 'TEST', sourceUrl: 'https://example.com/test', verifiedAt: '2026-09-22', values: { goals: 0, assists: 2 } };
assert.equal(VerifiedSeasonSchema.safeParse({ values: sample.values }).success, false);
assert.equal(VerifiedSeasonSchema.safeParse({ ...sample, values: { goals: -1 } }).success, false);
for (const stats of [null, { ...sample, values: {} }]) {
  assert.match(renderToStaticMarkup(React.createElement(PlayerStats, { stats })), /Verified season statistics are not available/);
}
const statsMarkup = renderToStaticMarkup(React.createElement(PlayerStats, { stats: VerifiedSeasonSchema.parse(sample) }));
assert.match(statsMarkup, /Goals<\/dt><dd[^>]*>0<\/dd>/);
assert.doesNotMatch(statsMarkup, /Appearances<\/dt>/);
assert.match(statsMarkup, /TEST · TEST/);

for (const direction of ['up', 'down', 'left', 'right', 'none']) {
  const reduced = getRevealAnimation({ direction, scale: true, clip: true, delay: 0.65, reduced: true });
  assert.deepEqual(reduced.initial, { x: 0, y: 0, scale: 1, clipPath: 'none', opacity: 0 });
  assert.deepEqual(reduced.visible, { x: 0, y: 0, scale: 1, clipPath: 'none', opacity: 1 });
  assert.equal(reduced.transition.delay, 0);
  assert.ok(reduced.transition.duration <= 0.2);
}
assert.equal(getRevealAnimation({}).visible.clipPath, 'none', 'Ordinary reveals must not clip focus rings');

// The Link branch must preserve the callback used to close the mobile menu.
const closeMenu = () => {};
const buttonLink = Button({ href: '/squad', onClick: closeMenu, children: 'Squad' });
assert.equal(buttonLink.props.onClick, closeMenu);
assert.equal(buttonLink.props.href, '/squad');
assert.match(renderToStaticMarkup(buttonLink), /<a[^>]*href="\/squad"/);
console.log('PASS model integrity, five filter states, missing/zero statistics, reduced-motion policy, and link callback forwarding');
