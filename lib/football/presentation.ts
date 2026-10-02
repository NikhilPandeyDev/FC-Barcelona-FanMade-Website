import type { Match, MatchSummary } from '@/lib/schemas/matches';

export function selectFeaturedMatch(matches: Match[]) {
  const upcoming = matches.filter((match) => match.status === 'UPCOMING').sort((a, b) => (a.kickoff ?? '').localeCompare(b.kickoff ?? ''));
  return matches.find((match) => match.status === 'IN_PROGRESS') ?? upcoming[0] ?? matches.find((match) => match.status === 'FINISHED') ?? matches[0] ?? null;
}
export function summarizeMatches(matches: Match[]): MatchSummary[] {
  return matches.map(({ id, competition, kickoff, homeTeam, awayTeam, status, score }) => ({ id, competition, kickoff, homeTeam, awayTeam, status, score }));
}
