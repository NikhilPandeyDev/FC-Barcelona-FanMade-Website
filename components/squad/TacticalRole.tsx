import type { SquadProfile } from '@/lib/schemas/squad';

export function TacticalRole({ player }: { player: SquadProfile }) {
  const { editorial } = player;
  return (
    <section aria-labelledby="tactics-title" className="border-t border-white/15 py-12 sm:py-16">
      <p className="squad-kicker">02 / Tactical identity</p>
      <div className="mt-7 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <h2 id="tactics-title" className="max-w-xl font-display text-3xl font-extrabold uppercase leading-tight sm:text-5xl">{editorial.headline}</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{editorial.description}</p>
          <h3 className="mt-8 font-mono text-xs uppercase tracking-widest text-gold-400">Responsibilities</h3>
          <ol className="mt-3">
            {editorial.responsibilities.map((item, index) => <li key={item} className="flex gap-5 border-b border-white/10 py-4 text-sm"><span className="font-mono text-muted-foreground">0{index + 1}</span>{item}</li>)}
          </ol>
        </div>
        <div>
          <figure className="border border-white/10 bg-card p-6 sm:p-8">
            <div className="mb-5 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground"><span>Role map</span><span>Attack ↑</span></div>
            <div className="tactical-pitch" aria-hidden="true"><div className="pitch-box pitch-box-top" /><div className="pitch-box pitch-box-bottom" /><div className="pitch-zone" data-zone={editorial.zone} /></div>
            <figcaption className="mt-5 text-sm text-foreground">{editorial.zoneLabel}<span className="mt-2 block text-xs leading-relaxed text-muted-foreground">Illustrative role zone, not a measured heatmap or position-tracking record.</span></figcaption>
          </figure>
          <h3 className="mt-7 font-mono text-xs uppercase tracking-widest text-gold-400">Strengths / editorial reading</h3>
          <ul className="mt-4 flex flex-wrap gap-2">{editorial.strengths.map((strength) => <li key={strength} className="border border-white/15 px-3 py-2 text-xs">{strength}</li>)}</ul>
        </div>
      </div>
      <p className="mt-8 text-xs text-muted-foreground">Fan editorial interpretation of the role. These descriptions are not measured player attributes or an official scouting assessment.</p>
    </section>
  );
}
