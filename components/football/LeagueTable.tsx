import { getBarcelonaStandings } from '@/lib/football/server';
import { FootballDataNotice } from './FootballDataNotice';

export async function LeagueTable() {
  const result = await getBarcelonaStandings();
  const table = result.data;
  if (!table) return <p className="mb-8 text-xs text-muted-foreground">Current La Liga standings are unavailable.</p>;
  return <details className="mb-10 border-y border-white/15 py-4">
    <summary className="flex min-h-11 cursor-pointer items-center font-display text-xl font-bold text-gold-400">La Liga standings · {table.season.startDate.slice(0, 4)}/{table.season.endDate.slice(0, 4)}</summary>
    <FootballDataNotice result={result} />
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="La Liga standings table"><table className="w-full text-left text-sm"><caption className="sr-only">Overall La Liga standings. P is played and Pts is points.</caption><thead><tr className="border-b border-white/20 text-muted-foreground"><th scope="col" className="p-3">Pos</th><th scope="col" className="p-3">Team</th><th scope="col" className="p-3">P</th><th scope="col" className="p-3">GD</th><th scope="col" className="p-3">Pts</th></tr></thead><tbody>{table.rows.map((row) => <tr key={row.team.id} className={`border-b border-white/10 ${row.team.id === 'barcelona' ? 'text-gold-400' : ''}`}><td className="p-3 font-mono">{row.position}</td><th scope="row" className="p-3 font-medium">{row.team.name}</th><td className="p-3 font-mono">{row.played}</td><td className="p-3 font-mono">{row.goalDifference}</td><td className="p-3 font-mono">{row.points}</td></tr>)}</tbody></table></div>
  </details>;
}
