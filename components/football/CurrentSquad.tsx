import { getBarcelonaTeam } from '@/lib/football/server';
import { FootballDataNotice } from './FootballDataNotice';

export async function CurrentSquad() {
  const result = await getBarcelonaTeam();
  const squad = result.data?.squad;
  if (!squad?.length) return <p className="mt-8 text-xs leading-relaxed text-muted-foreground">Current squad data is unavailable. The player collection below preserves its 2024/25 editorial edition.</p>;
  return <section className="my-10 border-y border-white/15 py-6" aria-labelledby="current-squad-title">
    <h2 id="current-squad-title" className="font-display text-2xl font-bold">Season roster snapshot</h2>
    <p className="mt-2 text-sm text-muted-foreground">The provider’s current-season roster may include players who appeared earlier in the season. It is shown separately from the editorial player collection.</p>
    <FootballDataNotice result={result} />
    <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{squad.map((player) => <li key={player.id} className="flex min-w-0 items-start gap-3 border-t border-white/10 py-3 text-sm"><span className="w-8 shrink-0 font-mono text-gold-400" aria-label={player.number ? `Shirt number ${player.number}` : 'Shirt number unavailable'}>{player.number ?? '—'}</span><div className="min-w-0 break-words"><span>{player.name}</span><p className="mt-1 text-xs text-muted-foreground">{player.position ?? 'Position unavailable'}</p></div></li>)}</ul>
  </section>;
}
