import type { CuratedMatch } from '@/data/matches';
import { MatchSchema, type Match } from '@/lib/schemas/matches';

export function normalizeCuratedMatch(raw: CuratedMatch, evidence: Pick<Match, 'status' | 'score' | 'halfTime' | 'source' | 'events' | 'stats' | 'lineups' | 'editorial'>): Match {
  const barca = { id: 'barcelona', name: 'FC Barcelona', shortName: 'BAR' };
  const opponent = { id: raw.opponent.shortName.toLowerCase(), name: raw.opponent.name, shortName: raw.opponent.shortName };
  return MatchSchema.parse({
    id: raw.id, competition: { name: raw.competition, round: raw.competitionRound, season: raw.season },
    kickoff: raw.date, venue: raw.venue || null,
    homeTeam: raw.isHome ? barca : opponent, awayTeam: raw.isHome ? opponent : barca,
    ...evidence,
  });
}
