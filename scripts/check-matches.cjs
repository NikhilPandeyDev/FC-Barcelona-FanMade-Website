// Model and server-rendered state coverage. Does not replace rendered browser QA.
const assert = require('node:assert/strict');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { load } = require('./lib/load-typescript.cjs');
const { getMatches, getMatchById, getFeaturedMatch } = load('data/match-center.ts');
const { MatchSchema, MatchStatSchema, LineupSchema } = load('lib/schemas/matches.ts');
const { filterMatches, matchDate } = load('lib/matches/presentation.ts');
const { MatchScoreboard } = load('components/matches/MatchScoreboard.tsx');
const { MatchStats } = load('components/matches/MatchStats.tsx');
const { MatchLineups, TacticalPitch } = load('components/matches/MatchLineups.tsx');
const { MatchTimeline } = load('components/matches/MatchTimeline.tsx');
const { MatchFilters } = load('components/matches/MatchFilters.tsx');
const render = (Component, props) => renderToStaticMarkup(React.createElement(Component, props));
const matches = getMatches();
assert.equal(matches.length, 3);
assert.equal(new Set(matches.map((match) => match.id)).size, 3);
assert.equal(getMatchById('missing'), undefined);
const bayern = getFeaturedMatch();
const clasico = getMatchById('m-liga-clasico');
const atalanta = getMatchById('m-ucl-01');
assert.deepEqual(atalanta.score, { home: 2, away: 2 });
assert.equal(atalanta.status, 'FINISHED');
assert.equal(clasico.homeTeam.shortName, 'RMA');
assert.deepEqual(clasico.score, { home: 0, away: 4 });
assert.ok(matches.every((match) => MatchSchema.safeParse(match).success));
assert.doesNotMatch(JSON.stringify(matches), /logoUrl|broadcastInfo|shotsTotal|xg|2\.85/);
for (const competition of ['All', 'La Liga', 'UEFA Champions League']) {
  const count = competition === 'All' ? 3 : competition === 'La Liga' ? 1 : 2;
  assert.equal(filterMatches(matches, 'All', competition).length, count);
  assert.equal(filterMatches(matches, 'Results', competition).length, count);
  assert.equal(filterMatches(matches, 'Upcoming', competition).length, 0);
}
// Synthetic future/status data is test-only.
const upcoming = { ...atalanta, status: 'UPCOMING', score: null, halfTime: null, kickoff: null };
assert.equal(MatchSchema.safeParse(upcoming).success, true);
assert.equal(filterMatches([upcoming], 'Upcoming', 'All').length, 1);
assert.match(render(MatchScoreboard, { match: upcoming }), /Date to be confirmed/);
assert.match(render(MatchScoreboard, { match: { ...upcoming, status: 'POSTPONED' } }), /Postponed/);
assert.equal(MatchSchema.safeParse({ ...upcoming, score: { home: 0, away: 0 } }).success, false);
assert.equal(MatchSchema.safeParse({ ...bayern, score: null }).success, false);
assert.equal(MatchSchema.safeParse({ ...bayern, halfTime: { home: 5, away: 1 } }).success, false);
assert.equal(MatchStatSchema.safeParse({ id: 'test', label: 'Test', unit: 'percent', home: 101, away: 0 }).success, false);
assert.match(matchDate(atalanta.kickoff, true), /21:00/);
assert.match(matchDate(bayern.kickoff, true), /21:00/);
assert.match(render(MatchScoreboard, { match: clasico }), /Real Madrid CF 0, FC Barcelona 4/);
assert.match(render(MatchStats, { match: clasico }), /Statistics unavailable/);
assert.match(render(MatchTimeline, { match: atalanta }), /Event timeline unavailable/);
assert.match(render(MatchLineups, { match: atalanta }), /Lineups &amp; tactical shape unavailable/);
const stats = render(MatchStats, { match: bayern });
assert.match(stats, /42%/);
assert.match(stats, /58%/);
assert.match(stats, /313/);
const zeroStats = { ...bayern, stats: { ...bayern.stats, items: [{ id: 'test', label: 'Test', unit: 'count', home: 0, away: 0 }] } };
assert.doesNotMatch(render(MatchStats, { match: zeroStats }), /NaN|Infinity/);
assert.match(render(MatchLineups, { match: bayern }), /Formation and pitch positions are not verified/);
assert.equal((render(MatchLineups, { match: bayern }).match(/<li>/g) ?? []).length, 22);
assert.equal(LineupSchema.safeParse({ ...bayern.lineups.home, starters: Array(11).fill(bayern.lineups.home.starters[0]) }).success, false);
// Exercise the future tactical renderer with synthetic positions, never shipped as football data.
const positioned = { ...bayern.lineups.home, starters: bayern.lineups.home.starters.map((player, i) => ({ ...player, x: 10 + i * 8, y: 50 })) };
assert.match(render(TacticalPitch, { lineup: positioned, team: bayern.homeTeam }), /not player tracking/);
for (const status of ['All', 'Upcoming', 'Results']) {
  const markup = render(MatchFilters, { status, competition: 'All', competitions: ['La Liga', 'UEFA Champions League'], onStatus() {}, onCompetition() {} });
  assert.equal((markup.match(/aria-pressed="true"/g) ?? []).length, 1);
  assert.equal((markup.match(/aria-controls="match-list"/g) ?? []).length, 4);
}
console.log('PASS match normalization, nine filter combinations, statuses, source safeguards, timezones, score order, zero/missing data, lineups and tactical fallback');
