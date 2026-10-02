import type { Match, MatchSource } from '@/lib/schemas/matches';

const source = (title: string, url: string): MatchSource => ({ title, url, verifiedAt: '2026-09-23' });
const bayernReport = source('UEFA full-time report (PDF)', 'https://www.uefa.com/newsfiles/UCL/2025/2041964_FR.pdf');
const bayernStats = source('UEFA full-time statistics (PDF)', 'https://www.uefa.com/newsfiles/UCL/2025/2041964_TS.pdf');
const bayernLineups = source('UEFA starting lineups (PDF)', 'https://www.uefa.com/newsfiles/UCL/2025/2041964_LU.pdf');
const clasicoReport = source('FC Barcelona match report', 'https://www.fcbarcelona.com/en/news/4156771/real-madrid-0-4-fc-barcelona-viva-la-vida');
const clasicoEvents = source('FC Barcelona Players match record', 'https://players.fcbarcelona.com/en/match/f2445113-real-madrid-barcelona');
const atalantaReport = source('UEFA full-time report (PDF)', 'https://www.uefa.com/newsfiles/UCL/2025/2042070_FR.pdf');

// Historical verification only. Never fetch these sources in the application.
// Explicit allowlist: legacy unverified statistics and broadcast claims are excluded.
type Evidence = Pick<Match, 'status' | 'score' | 'halfTime' | 'source' | 'events' | 'stats' | 'lineups' | 'editorial'>;
const goal = (minute: number, player: string, side: 'home' | 'away', assist?: string) => ({ id: `${minute}-${side}`, minute, player, side, type: 'GOAL' as const, ...(assist ? { assist } : {}) });
const starters = (players: [number, string][]) => players.map(([number, name]) => ({ number, name }));

export const matchEvidence: Record<string, Evidence> = {
  'm-ucl-01': {
    status: 'FINISHED', score: { home: 2, away: 2 }, halfTime: { home: 0, away: 0 }, source: atalantaReport,
    events: null, stats: null, lineups: null,
    editorial: { title: 'An open ending.', description: 'Two leads. Two replies. A European night that ended all square in Barcelona.' },
  },
  'm-liga-clasico': {
    status: 'FINISHED', score: { home: 0, away: 4 }, halfTime: { home: 0, away: 0 }, source: clasicoReport,
    events: { source: clasicoEvents, coverage: 'All goals · cards and substitutions omitted', items: [goal(54, 'Robert Lewandowski', 'away'), goal(56, 'Robert Lewandowski', 'away'), goal(77, 'Lamine Yamal', 'away'), goal(84, 'Raphinha', 'away')] },
    stats: null, lineups: null,
    editorial: { title: 'A statement in Madrid.', description: 'Level at the interval. Four goals after it. A Clásico remembered in blaugrana.' },
  },
  'm-ucl-bayern': {
    status: 'FINISHED', score: { home: 4, away: 1 }, halfTime: { home: 3, away: 1 }, source: bayernReport,
    events: { source: bayernReport, coverage: 'All goals · cards and substitutions omitted', items: [goal(1, 'Raphinha', 'home'), goal(18, 'Harry Kane', 'away'), goal(36, 'Robert Lewandowski', 'home'), goal(45, 'Raphinha', 'home'), goal(56, 'Raphinha', 'home')] },
    stats: { source: bayernStats, items: [
      { id: 'possession', label: 'Possession', unit: 'percent', home: 42, away: 58 },
      { id: 'attempts', label: 'Total attempts', unit: 'count', home: 12, away: 12 },
      { id: 'on-target', label: 'Shots on target', unit: 'count', home: 4, away: 3 },
      { id: 'passes', label: 'Passes completed', unit: 'count', home: 313, away: 502 },
      { id: 'corners', label: 'Corners', unit: 'count', home: 5, away: 5 },
      { id: 'fouls', label: 'Fouls committed', unit: 'count', home: 11, away: 10 },
    ] },
    lineups: {
      home: { formation: null, source: bayernLineups, substitutes: null, starters: starters([[13, 'Iñaki Peña'], [2, 'Pau Cubarsí'], [3, 'Alejandro Balde'], [5, 'Iñigo Martínez'], [8, 'Pedri'], [9, 'Robert Lewandowski'], [11, 'Raphinha'], [16, 'Fermín López'], [17, 'Marc Casadó'], [19, 'Lamine Yamal'], [23, 'Jules Koundé']]) },
      away: { formation: null, source: bayernLineups, substitutes: null, starters: starters([[1, 'Manuel Neuer'], [2, 'Dayot Upamecano'], [3, 'Minjae Kim'], [6, 'Joshua Kimmich'], [7, 'Serge Gnabry'], [9, 'Harry Kane'], [16, 'João Palhinha'], [17, 'Michael Olise'], [19, 'Alphonso Davies'], [22, 'Raphaël Guerreiro'], [25, 'Thomas Müller']]) },
    },
    editorial: { title: 'A night to remember.', description: 'Raphinha’s hat-trick. Lewandowski’s finish. Four goals under the lights of Montjuïc.' },
  },
};
