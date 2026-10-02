// Hermetic provider/service tests. Synthetic fixtures never enter application data.
const assert = require('node:assert/strict');
const { load } = require('./lib/load-typescript.cjs');
const { createFootballClient } = load('lib/football/client.ts');
const { createFootballDataProvider } = load('lib/football/provider.ts');
const { createFootballService } = load('lib/football/service.ts');
const { normalizeMatch, normalizeClub, normalizeStandings } = load('lib/football/adapters/football-data.ts');
const { getMatches } = load('data/match-center.ts');
const { FootballDataError } = load('lib/football/errors.ts');
const { filterMatches } = load('lib/matches/presentation.ts');
const { selectFeaturedMatch } = load('lib/football/presentation.ts');
const fixedTime = Date.parse('2026-10-02T12:00:00Z');
const timestamp = new Date(fixedTime).toISOString();
const token = 'SYNTHETIC_TEST_TOKEN_ONLY';
const sample = {
  id: 1001, utcDate: '2026-10-05T19:00:00Z', status: 'TIMED',
  competition: { id: 2014, code: 'PD', name: 'Primera Division' },
  season: { id: 900, startDate: '2026-08-01', endDate: '2027-06-01' },
  homeTeam: { id: 81, name: 'FC Barcelona', tla: 'FCB' },
  awayTeam: { id: 999, name: 'Synthetic Opponent With A Long Name FC', tla: null, shortName: null },
  score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null }, duration: 'REGULAR' },
};
const clone = (value) => structuredClone(value);
const json = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json', ...headers } });
const throwsReason = async (promise, reason) => assert.rejects(promise, (error) => error.reason === reason && !error.message.includes(token));

(async () => {
  const upcoming = normalizeMatch(sample, timestamp);
  assert.equal(upcoming.homeTeam.id, 'barcelona');
  assert.equal(upcoming.status, 'UPCOMING');
  assert.equal(upcoming.score, null);
  assert.equal(upcoming.venue, null);
  assert.equal(upcoming.stats, null);
  assert.equal(upcoming.lineups, null);
  assert.equal(upcoming.dataKind, 'provider');
  assert.equal(upcoming.awayTeam.shortName, sample.awayTeam.name);
  const finished = clone(sample);
  finished.status = 'FINISHED';
  finished.homeTeam = sample.awayTeam;
  finished.awayTeam = sample.homeTeam;
  finished.score.fullTime = { home: 0, away: 2 };
  finished.score.halfTime = { home: 0, away: 0 };
  const result = normalizeMatch(finished, timestamp);
  assert.deepEqual(result.score, { home: 0, away: 2 });
  assert.equal(result.awayTeam.id, 'barcelona');
  for (const [status, expected] of Object.entries({ SCHEDULED: 'UPCOMING', IN_PLAY: 'IN_PROGRESS', PAUSED: 'IN_PROGRESS', SUSPENDED: 'SUSPENDED', POSTPONED: 'POSTPONED', CANCELLED: 'CANCELLED', AWARDED: 'AWARDED' })) {
    assert.equal(normalizeMatch({ ...sample, status }, timestamp).status, expected);
  }
  assert.equal(filterMatches([upcoming, result], 'Results', 'All').length, 1);
  assert.equal(selectFeaturedMatch([result, upcoming]).id, upcoming.id);
  for (const bad of [
    { ...sample, id: -1 }, { ...sample, utcDate: 'invalid' }, { ...sample, status: 'NEW_PROVIDER_STATUS' },
    { ...sample, homeTeam: { ...sample.homeTeam, name: '' } },
    { ...sample, homeTeam: { ...sample.homeTeam, id: 300 } },
    { ...sample, score: { fullTime: { home: 1, away: null } } },
  ]) assert.throws(() => normalizeMatch(bad, timestamp));
  const club = normalizeClub({ ...sample.homeTeam, squad: [{ id: 10, name: 'Synthetic Player', position: null, shirtNumber: null }] }, timestamp);
  assert.equal(club.squad[0].number, null);
  assert.throws(() => normalizeClub({ ...sample.homeTeam, squad: [{ id: 10, name: 'First' }, { id: 10, name: 'Duplicate' }] }, timestamp));
  assert.equal(normalizeClub(sample.homeTeam, timestamp).squad, null);
  const table = { competition: sample.competition, season: sample.season, standings: [{ type: 'TOTAL', table: [{ position: 1, team: sample.homeTeam, playedGames: 0, won: 0, draw: 0, lost: 0, points: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0 }] }] };
  assert.equal(normalizeStandings(table, timestamp).rows[0].points, 0);
  assert.throws(() => normalizeStandings({ ...table, standings: [] }, timestamp));

  let calls = 0;
  const provider = createFootballDataProvider(token, async (url, options) => {
    calls++;
    assert.equal(new URL(url).origin, 'https://api.football-data.org');
    assert.equal(options.headers['X-Auth-Token'], token);
    assert.equal(options.redirect, 'error');
    assert.equal(options.cache, 'no-store');
    if (new URL(url).pathname.endsWith('/matches/1001')) return json(sample);
    if (new URL(url).pathname.endsWith('/standings')) return json(table);
    if (new URL(url).pathname.endsWith('/teams/81')) return json(sample.homeTeam);
    assert.equal(new URL(url).searchParams.has('competitions'), false);
    return json({ matches: [sample, { ...sample, id: 1002, competition: { id: 2079, code: 'CDR', name: 'Synthetic Cup' } }] });
  }, () => fixedTime);
  const [feed1, feed2] = await Promise.all([provider.getFixtures(), provider.getFixtures()]);
  assert.equal(calls, 1, 'Concurrent duplicate requests must coalesce');
  assert.deepEqual(feed1, feed2);
  assert.equal(feed1.length, 1, 'Unsupported competitions must be excluded locally');
  assert.equal((await provider.getMatch('fd-1001')).id, 'fd-1001');
  assert.equal((await provider.getStandings()).rows.length, 1);
  assert.equal((await provider.getTeam()).id, 'barcelona');
  const beforeInvalid = calls;
  await throwsReason(provider.getMatch('../1001'), 'not_found');
  assert.equal(calls, beforeInvalid, 'Invalid IDs must not make network requests');
  const invalidProvider = createFootballDataProvider(token, async () => json({ matches: [{ ...sample, id: 'not-an-id' }] }), () => fixedTime);
  const invalidFallback = await createFootballService(invalidProvider, getMatches()).getFixtures();
  assert.equal(invalidFallback.mode, 'curated');
  assert.equal(invalidFallback.reason, 'invalid_data');
  assert.equal(invalidFallback.data.length, 3);
  const missing = createFootballService(null, getMatches());
  assert.equal((await missing.getFixtures()).reason, 'missing_key');
  assert.equal((await missing.getMatch('m-ucl-bayern')).data.id, 'm-ucl-bayern');
  assert.equal((await missing.getMatch('not-a-match')).reason, 'not_found');
  assert.equal((await missing.getMatch('fd-1001')).reason, 'missing_key');
  const emptyProvider = { ...provider, async getFixtures() { return []; } };
  assert.equal((await createFootballService(emptyProvider, getMatches()).getFixtures()).mode, 'provider');
  assert.equal((await createFootballService(emptyProvider, getMatches()).getFixtures()).data.length, 0, 'Valid empty responses must not pretend to be archive data');
  let detailCalls = 0;
  const scoped = createFootballService({ ...provider, async getFixtures() { return [upcoming]; }, async getMatch() { detailCalls++; throw new FootballDataError('timeout'); } }, getMatches());
  assert.equal((await scoped.getMatch('fd-9999')).reason, 'not_found');
  assert.equal(detailCalls, 0, 'Unlisted IDs must not trigger match-specific requests');
  const degraded = await scoped.getMatch('fd-1001');
  assert.equal(degraded.data.id, 'fd-1001');
  assert.equal(degraded.reason, 'timeout');
  for (const reason of ['authentication', 'rate_limit', 'timeout', 'unavailable']) {
    const failing = { ...provider, async getFixtures() { throw new FootballDataError(reason); } };
    const fallback = await createFootballService(failing, getMatches()).getFixtures();
    assert.equal(fallback.mode, 'curated');
    assert.equal(fallback.reason, reason);
  }
  for (const [status, reason] of [[401, 'authentication'], [403, 'authentication'], [429, 'rate_limit'], [503, 'unavailable'], [404, 'not_found']]) {
    const client = createFootballClient(token, async () => json({ message: token }, status), () => fixedTime);
    await throwsReason(client.get('teams/81'), reason);
  }
  let limitedCalls = 0;
  const limited = createFootballClient(token, async () => { limitedCalls++; return json({}); }, () => fixedTime);
  for (let i = 1; i <= 8; i++) await limited.get(`matches/${i}`);
  await throwsReason(limited.get('matches/9'), 'rate_limit');
  assert.equal(limitedCalls, 8);
  assert.throws(() => limited.get('https://evil.example/teams/81'), (error) => error.reason === 'configuration');
  let cooldownCalls = 0;
  const cooldown = createFootballClient(token, async () => { cooldownCalls++; return json({}, 429, { 'Retry-After': '120' }); }, () => fixedTime);
  await throwsReason(cooldown.get('teams/81'), 'rate_limit');
  await throwsReason(cooldown.get('competitions/PD/standings'), 'rate_limit');
  assert.equal(cooldownCalls, 1);
  const timeoutClient = createFootballClient(token, async () => { throw new DOMException('Raw sensitive details', 'TimeoutError'); });
  await throwsReason(timeoutClient.get('teams/81'), 'timeout');
  const invalidJson = createFootballClient(token, async () => new Response('not json', { headers: { 'content-type': 'application/json' } }));
  await throwsReason(invalidJson.get('teams/81'), 'invalid_data');
  console.log('PASS provider success (mock), schema/status normalization, empty/missing values, ID scoping, failure fallbacks, coalescing, rate-limit cooldown, timeout and sanitized errors');
})().catch((error) => { console.error(error); process.exitCode = 1; });
