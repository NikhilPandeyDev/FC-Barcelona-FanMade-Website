import { z } from 'zod';
import { MatchSchema, type Match, TeamSchema } from '@/lib/schemas/matches';
import { CompetitionTableSchema, FootballTeamSchema } from '../schemas/domain';
import { ProviderMatchSchema, ProviderClubSchema, ProviderStandingsSchema, ProviderTeamSchema } from '../schemas/football-data';
import { BARCELONA_TEAM_ID } from '../types';
import { FootballDataError } from '../errors';

type RawMatch = z.infer<typeof ProviderMatchSchema>;
export function normalizeTeam(raw: z.infer<typeof ProviderTeamSchema>) {
  return TeamSchema.parse({ id: raw.id === BARCELONA_TEAM_ID ? 'barcelona' : `fd-team-${raw.id}`, name: raw.name, shortName: raw.tla ?? raw.shortName ?? raw.name });
}
const statuses: Record<RawMatch['status'], Match['status']> = { SCHEDULED: 'UPCOMING', TIMED: 'UPCOMING', IN_PLAY: 'IN_PROGRESS', PAUSED: 'IN_PROGRESS', FINISHED: 'FINISHED', SUSPENDED: 'SUSPENDED', POSTPONED: 'POSTPONED', CANCELLED: 'CANCELLED', AWARDED: 'AWARDED' };
function scorePair(value: { home: number | null; away: number | null } | undefined) {
  if (!value || (value.home === null && value.away === null)) return null;
  if (value.home === null || value.away === null) throw new FootballDataError('invalid_data');
  return { home: value.home, away: value.away };
}
export function normalizeMatch(input: unknown, retrievedAt: string): Match {
  const raw = ProviderMatchSchema.parse(input);
  if (![raw.homeTeam.id, raw.awayTeam.id].includes(BARCELONA_TEAM_ID) || !['PD', 'CL'].includes(raw.competition.code)) throw new FootballDataError('invalid_data');
  const homeTeam = normalizeTeam(raw.homeTeam);
  const awayTeam = normalizeTeam(raw.awayTeam);
  const season = `${raw.season.startDate.slice(0, 4)}/${raw.season.endDate.slice(0, 4)}`;
  const competitionName = raw.competition.code === 'PD' ? 'La Liga' : 'UEFA Champions League';
  return MatchSchema.parse({
    id: `fd-${raw.id}`, homeTeam, awayTeam, kickoff: raw.utcDate, venue: raw.venue ?? null,
    competition: { name: competitionName, season, round: raw.matchday ? `Matchday ${raw.matchday}` : raw.stage?.replace(/_/g, ' ') ?? 'Round unavailable' },
    status: statuses[raw.status], score: scorePair(raw.score.fullTime), halfTime: scorePair(raw.score.halfTime),
    scoreDuration: raw.score.duration, penalties: scorePair(raw.score.penalties),
    dataKind: 'provider', retrievedAt, updatedAt: raw.lastUpdated ?? null,
    source: { title: 'Football-Data.org match snapshot', url: 'https://www.football-data.org/', verifiedAt: retrievedAt.slice(0, 10) },
    // Detailed events, lineups and statistics are not included in the selected free plan.
    events: null, stats: null, lineups: null,
    editorial: { title: `${homeTeam.name} × ${awayTeam.name}`, description: `${competitionName} · ${season}. Explore the match details available in this delayed provider snapshot.` },
  });
}
export function normalizeClub(input: unknown, retrievedAt: string) {
  const raw = ProviderClubSchema.parse(input);
  if (raw.id !== BARCELONA_TEAM_ID) throw new FootballDataError('invalid_data');
  return FootballTeamSchema.parse({ ...normalizeTeam(raw), venue: raw.venue ?? null, retrievedAt, updatedAt: raw.lastUpdated ?? null,
    squad: raw.squad?.length ? raw.squad.map((player) => ({ id: `fd-player-${player.id}`, name: player.name, position: player.position ?? null, nationality: player.nationality ?? null, birthDate: player.dateOfBirth ?? null, number: player.shirtNumber ?? null })) : null,
  });
}
export function normalizeStandings(input: unknown, retrievedAt: string) {
  const raw = ProviderStandingsSchema.parse(input);
  if (raw.competition.code !== 'PD') throw new FootballDataError('invalid_data');
  const total = raw.standings.find((table) => table.type === 'TOTAL');
  if (!total) throw new FootballDataError('invalid_data');
  return CompetitionTableSchema.parse({
    competition: { id: 'la-liga', name: 'La Liga' }, season: { id: `fd-season-${raw.season.id}`, startDate: raw.season.startDate, endDate: raw.season.endDate }, retrievedAt,
    rows: total.table.map((row) => ({ position: row.position, team: normalizeTeam(row.team), played: row.playedGames, won: row.won, drawn: row.draw, lost: row.lost, points: row.points, goalsFor: row.goalsFor, goalsAgainst: row.goalsAgainst, goalDifference: row.goalDifference })),
  });
}
