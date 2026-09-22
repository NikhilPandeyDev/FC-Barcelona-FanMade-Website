import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { PlayerCardMedia } from './PlayerCardMedia';
import type { SquadProfile } from '@/lib/schemas/squad';
import { squadEdition } from '@/data/players';

export function PlayerHeader({ player }: { player: SquadProfile }) {
  return (
    <header className="pb-12 pt-28 sm:pb-16 sm:pt-36">
      <Link href="/squad" className="squad-text-link inline-flex min-h-11 items-center text-xs">← Back to squad</Link>
      <div className="mt-6 grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <Reveal key={`${player.slug}-art`} duration={0.55} className="order-2 lg:order-1"><PlayerCardMedia player={player} large /></Reveal>
        <div className="player-identity order-1 min-w-0 lg:order-2">
          <p className="squad-kicker">{squadEdition.season} collection / No. {player.number}</p>
          <Reveal key={player.slug} duration={0.55} clip className="mt-6">
            <h1 className="player-name font-display font-extrabold uppercase tracking-tighter">{player.displayName}</h1>
          </Reveal>
          <p className="mt-5 text-lg text-muted-foreground">{player.editorial.role}</p>
          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-white/20 pt-6">
            <div><dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Position</dt><dd className="mt-2 text-sm">{player.position}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Nationality</dt><dd className="mt-2 text-sm">{player.nationality}</dd></div>
          </dl>
          <p className="mt-7 text-xs leading-relaxed text-muted-foreground">An archived profile. Shirt number refers to 2024/25.</p>
        </div>
      </div>
    </header>
  );
}
