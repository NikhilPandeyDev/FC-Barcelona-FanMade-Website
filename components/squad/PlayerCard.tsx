import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { SquadProfile } from '@/lib/schemas/squad';
import { PlayerCardMedia } from './PlayerCardMedia';

export function PlayerCard({ player }: { player: SquadProfile }) {
  return (
    <Link href={`/squad/${player.slug}`} className="player-card group" aria-label={`Explore ${player.displayName}, ${player.position}, number ${player.number}`}>
      <PlayerCardMedia player={player} />
      <div className="player-card-copy relative flex flex-1 flex-col border-t border-white/15 p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>{player.position}</span><span>{player.nationality}</span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="player-card-name min-w-0 font-display font-extrabold uppercase leading-tight tracking-tight">{player.displayName}</h3>
          <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-gold-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{player.editorial.role}</p>
        <span className="mt-auto inline-block pt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">Explore profile ↗</span>
      </div>
    </Link>
  );
}
