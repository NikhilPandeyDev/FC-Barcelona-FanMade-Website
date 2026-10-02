// Curated match identities. Verified results and optional detail live in match-evidence.ts.
// No generated crest URLs, broadcast assumptions, or unverified statistics.
export type CuratedMatch = {
  id: string;
  competition: string;
  competitionRound: string;
  season: string;
  date: string;
  venue: string;
  isHome: boolean;
  opponent: { name: string; shortName: string };
};

export const matches: CuratedMatch[] = [
  {
    id: 'm-ucl-01',
    competition: 'UEFA Champions League',
    competitionRound: 'League Phase — Matchday 8',
    season: '2024/2025',
    date: '2025-01-29T20:00:00Z',
    venue: 'Estadi Olímpic Lluís Companys, Barcelona',
    isHome: true,
    opponent: { name: 'Atalanta BC', shortName: 'ATA' },
  },
  {
    id: 'm-liga-clasico',
    competition: 'La Liga',
    competitionRound: 'Matchday 11',
    season: '2024/2025',
    date: '2024-10-26T19:00:00Z',
    venue: 'Santiago Bernabéu, Madrid',
    isHome: false,
    opponent: { name: 'Real Madrid CF', shortName: 'RMA' },
  },
  {
    id: 'm-ucl-bayern',
    competition: 'UEFA Champions League',
    competitionRound: 'League Phase — Matchday 3',
    season: '2024/2025',
    date: '2024-10-23T19:00:00Z',
    venue: 'Estadi Olímpic Lluís Companys, Barcelona',
    isHome: true,
    opponent: { name: 'FC Bayern München', shortName: 'BAY' },
  },
];
