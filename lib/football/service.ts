import type { Match } from '@/lib/schemas/matches';
import type { FootballProvider, FootballResult, FailureReason } from './types';
import { failureReason } from './errors';

// Provider-neutral service. Dependency injection permits offline failure tests.
export function createFootballService(provider: FootballProvider | null, archive: Match[], absentReason: FailureReason = 'missing_key') {
  const result = <T>(data: T, mode: FootballResult<T>['mode'], reason: FailureReason | null = null, retrievedAt: string | null = null): FootballResult<T> => ({ data, mode, reason, retrievedAt });
  return {
    async getFixtures() {
      if (!provider) return result(archive, 'curated', absentReason);
      try { const matches = await provider.getFixtures(); return result(matches, 'provider', null, matches[0]?.retrievedAt ?? null); }
      catch (error) { return result(archive, 'curated', failureReason(error)); }
    },
    async getMatch(id: string): Promise<FootballResult<Match | null>> {
      const historical = archive.find((match) => match.id === id);
      if (historical) return result(historical, 'curated');
      if (!/^fd-[1-9]\d{0,9}$/.test(id)) return result(null, 'unavailable', 'not_found');
      if (!provider) return result(null, 'unavailable', absentReason);
      try {
        // Check the shared team feed before any ID-specific request. Random URLs
        // cannot cause unbounded requests for unrelated matches.
        const fixtures = await provider.getFixtures();
        const summary = fixtures.find((match) => match.id === id);
        if (!summary) return result(null, 'unavailable', 'not_found');
        try {
          const detail = await provider.getMatch(id);
          return detail ? result(detail, 'provider', null, detail.retrievedAt ?? null) : result(null, 'unavailable', 'not_found');
        } catch (error) {
          // Validated feed data can still render when the detail endpoint fails.
          return result(summary, 'provider', failureReason(error), summary.retrievedAt ?? null);
        }
      } catch (error) { return result(null, 'unavailable', failureReason(error)); }
    },
    async getTeam() {
      if (!provider) return result(null, 'unavailable', absentReason);
      try { const team = await provider.getTeam(); return result(team, 'provider', null, team.retrievedAt); }
      catch (error) { return result(null, 'unavailable', failureReason(error)); }
    },
    async getStandings() {
      if (!provider) return result(null, 'unavailable', absentReason);
      try { const table = await provider.getStandings(); return result(table, 'provider', null, table.retrievedAt); }
      catch (error) { return result(null, 'unavailable', failureReason(error)); }
    },
  };
}
