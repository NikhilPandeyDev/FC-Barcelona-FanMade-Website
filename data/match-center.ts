import { matches } from './matches';
import { matchEvidence } from './match-evidence';
import { normalizeCuratedMatch } from '@/lib/matches/adapter';

const archive = matches.map((match) => {
  const evidence = matchEvidence[match.id];
  if (!evidence) throw new Error(`Missing match evidence: ${match.id}`);
  return normalizeCuratedMatch(match, evidence);
}).sort((a, b) => (b.kickoff ?? '').localeCompare(a.kickoff ?? ''));

export const getMatches = () => archive;
export const getMatchSummaries = () => archive.map(({ id, competition, kickoff, homeTeam, awayTeam, status, score }) => ({ id, competition, kickoff, homeTeam, awayTeam, status, score }));
export const getMatchById = (id: string) => archive.find((match) => match.id === id);
export const getFeaturedMatch = () => archive.find((match) => match.id === 'm-ucl-bayern')!;
