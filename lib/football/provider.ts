import 'server-only';
import { createFootballClient } from './client';
import { normalizeClub, normalizeMatch, normalizeStandings } from './adapters/football-data';
import { ProviderFixturesSchema } from './schemas/football-data';
import { FootballDataError } from './errors';
import type { FootballProvider } from './types';

export function createFootballDataProvider(token: string, fetcher: typeof fetch = fetch, now = Date.now): FootballProvider {
  const client = createFootballClient(token, fetcher, now);
  const timestamp = () => new Date(now()).toISOString();
  return {
    async getTeam() { return normalizeClub(await client.get('teams/81'), timestamp()); },
    async getFixtures() {
      const start = new Date(now() - 90 * 86400000).toISOString().slice(0, 10);
      const end = new Date(now() + 91 * 86400000).toISOString().slice(0, 10);
      const raw = ProviderFixturesSchema.parse(await client.get(`teams/81/matches?dateFrom=${start}&dateTo=${end}&limit=200`));
      const retrievedAt = timestamp();
      // The team subresource documents date/limit filters, not competitions.
      const matches = raw.matches.filter((match) => ['PD', 'CL'].includes(match.competition.code)).map((match) => normalizeMatch(match, retrievedAt));
      if (new Set(matches.map((match) => match.id)).size !== matches.length) throw new FootballDataError('invalid_data');
      return matches.sort((a, b) => (b.kickoff ?? '').localeCompare(a.kickoff ?? ''));
    },
    async getMatch(id) {
      if (!/^fd-[1-9]\d{0,9}$/.test(id)) throw new FootballDataError('not_found');
      try {
        const match = normalizeMatch(await client.get(`matches/${id.slice(3)}`), timestamp());
        if (match.id !== id) throw new FootballDataError('invalid_data');
        return match;
      } catch (error) {
        if (error instanceof FootballDataError && error.reason === 'not_found') return null;
        throw error;
      }
    },
    async getStandings() { return normalizeStandings(await client.get('competitions/PD/standings'), timestamp()); },
  };
}
