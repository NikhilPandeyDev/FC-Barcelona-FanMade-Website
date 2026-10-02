import type { Match, Team } from '@/lib/schemas/matches';
import type { FootballTeam, CompetitionTable } from './schemas/domain';

export type FailureReason = 'missing_key' | 'offline' | 'configuration' | 'authentication' | 'rate_limit' | 'timeout' | 'unavailable' | 'invalid_data' | 'not_found';
export type FootballResult<T> = { data: T; mode: 'provider' | 'curated' | 'unavailable'; reason: FailureReason | null; retrievedAt: string | null };
export interface FootballProvider {
  getTeam(): Promise<FootballTeam>;
  getFixtures(): Promise<Match[]>;
  getMatch(id: string): Promise<Match | null>;
  getStandings(): Promise<CompetitionTable>;
}
export const BARCELONA_TEAM_ID = 81;
export const BARCELONA: Team = { id: 'barcelona', name: 'FC Barcelona', shortName: 'BAR' };
export const FOOTBALL_CACHE = { fixtures: 900, match: 900, team: 86400, standings: 3600 } as const;
