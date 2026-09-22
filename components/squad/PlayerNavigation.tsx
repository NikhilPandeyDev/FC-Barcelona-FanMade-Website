import Link from 'next/link';
import type { SquadProfile } from '@/lib/schemas/squad';

export function PlayerNavigation({ previous, next }: { previous: SquadProfile; next: SquadProfile }) {
  return (
    <nav aria-label="Player navigation" className="mb-16 grid grid-cols-1 border-y border-white/20 sm:grid-cols-2">
      {[{ player: previous, label: '← Previous player' }, { player: next, label: 'Next player →' }].map(({ player, label }, index) => (
        <Link key={label} href={`/squad/${player.slug}`} className={`player-navigation-link group min-w-0 p-6 transition-colors hover:bg-white/5 sm:p-8 ${index ? 'border-t border-white/15 sm:border-l sm:border-t-0 sm:text-right' : ''}`}>
          <span className="font-mono text-[11px] uppercase tracking-wider text-gold-400">{label}</span>
          <span className="player-navigation-name mt-3 block font-display font-extrabold uppercase">{player.displayName}</span>
          <span className="mt-2 block text-xs text-muted-foreground">{player.position} / No. {player.number}</span>
        </Link>
      ))}
    </nav>
  );
}
