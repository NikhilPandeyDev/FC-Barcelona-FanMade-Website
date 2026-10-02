import type { Match, MatchSummary } from '@/lib/schemas/matches';

export const matchFilters = ['All', 'Upcoming', 'Results'] as const;
export type MatchFilter = typeof matchFilters[number];
export function filterMatches<T extends MatchSummary>(matches: T[], status: MatchFilter, competition: string) {
  return matches.filter((match) => (competition === 'All' || match.competition.name === competition) &&
    (status === 'All' || (status === 'Results' ? match.status === 'FINISHED' : match.status === 'UPCOMING')));
}
export function matchDate(kickoff: string | null, includeTime = false) {
  if (!kickoff) return 'Date to be confirmed';
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', day: '2-digit', month: 'short', year: 'numeric', ...(includeTime ? { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' } as const : {}) }).format(new Date(kickoff));
}
export const matchStatus = (status: Match['status']) => ({ FINISHED: 'Full time', UPCOMING: 'Upcoming', POSTPONED: 'Postponed' })[status];
