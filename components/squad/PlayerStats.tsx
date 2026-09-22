import type { VerifiedSeason } from '@/lib/schemas/squad';

const metrics = [
  ['appearances', 'Appearances'], ['starts', 'Starts'], ['minutesPlayed', 'Minutes'],
  ['goals', 'Goals'], ['assists', 'Assists'], ['cleanSheets', 'Clean sheets'],
  ['passAccuracyPct', 'Pass accuracy', '%'], ['dribblesSuccPct', 'Successful dribbles', '%'],
  ['tacklesWonPct', 'Tackles won', '%'], ['yellowCards', 'Yellow cards'],
  ['redCards', 'Red cards'], ['ratingAvg', 'Average rating'],
] as const;

export function PlayerStats({ stats }: { stats: VerifiedSeason | null }) {
  const available = stats ? metrics.filter(([key]) => stats.values[key] != null) : [];
  return (
    <section aria-labelledby="stats-title" className="border-t border-white/15 py-12 sm:py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div><p className="squad-kicker">03 / The numbers</p><h2 id="stats-title" className="mt-4 font-display text-3xl font-extrabold uppercase">Season record</h2></div>
        {stats && available.length ? <div>
          <p className="mb-6 text-sm text-muted-foreground">{stats.season} · {stats.competition}</p>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {available.map(([key, label, unit]) => <div key={key} className="border-t border-white/15 pt-4"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-2 font-mono text-3xl">{stats.values[key]}{unit ?? ''}</dd></div>)}
          </dl>
          <a className="squad-text-link mt-6 inline-block text-xs" href={stats.sourceUrl}>Source · verified {stats.verifiedAt} ↗</a>
        </div> : <div className="border-l-2 border-gold-500/60 bg-white/[0.02] p-6 sm:p-8">
          <p className="font-display text-xl font-bold">A player is more than a number.</p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">Verified season statistics are not available in this collection yet. Appearances, minutes, goals and assists will appear here once their season and source are confirmed.</p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-gold-400">No estimated ratings or radar scores</p>
        </div>}
      </div>
    </section>
  );
}
