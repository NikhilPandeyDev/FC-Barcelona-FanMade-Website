import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlayerBySlug, getSquadPlayers } from '@/data/players';
import { Container } from '@/components/ui/Container';
import { PlayerHeader } from '@/components/squad/PlayerHeader';
import { TacticalRole } from '@/components/squad/TacticalRole';
import { PlayerStats } from '@/components/squad/PlayerStats';
import { PlayerNavigation } from '@/components/squad/PlayerNavigation';
import { Reveal } from '@/components/motion/Reveal';

type Props = { params: { slug: string } };
// This edition is a closed static archive. Reject unknown slugs before a
// streaming loading boundary can commit a 200 response.
export const dynamicParams = false;
export function generateStaticParams() {
  return getSquadPlayers().map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const player = getPlayerBySlug(params.slug);
  if (!player) return { title: 'Player not found | Culé Experience' };
  const title = `${player.displayName} — 2024/25 Player Profile | Culé Experience`;
  const description = `${player.displayName}: biography and an editorial look at the ${player.position.toLowerCase()}'s tactical role. An unofficial 2024/25 archive.`;
  return { title, description, openGraph: { title, description, type: 'website' } };
}

export default function PlayerPage({ params }: Props) {
  const player = getPlayerBySlug(params.slug);
  if (!player) notFound();
  const players = getSquadPlayers();
  const index = players.findIndex((entry) => entry.slug === player.slug);
  return <Container size="wide">
    <PlayerHeader player={player} />
    <section aria-labelledby="biography-title" className="grid gap-7 border-t border-white/15 py-12 md:grid-cols-[1fr_2fr] sm:py-16">
      <div><p className="squad-kicker">01 / The player</p><h2 id="biography-title" className="mt-4 font-display text-3xl font-extrabold uppercase">The story so far</h2></div>
      <div><p className="font-display text-xl font-bold">{player.name}</p><p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{player.bio}</p><a className="squad-text-link mt-5 inline-block text-xs" href={player.sourceUrl}>Biography source · FC Barcelona ↗</a></div>
    </section>
    <Reveal duration={0.5}><TacticalRole player={player} /></Reveal>
    <PlayerStats stats={player.stats} />
    <PlayerNavigation previous={players[(index - 1 + players.length) % players.length]} next={players[(index + 1) % players.length]} />
  </Container>;
}
