import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { SquadHero } from '@/components/squad/SquadHero';
import { SquadGrid } from '@/components/squad/SquadGrid';
import { getSquadPlayers, squadEdition } from '@/data/players';

export const metadata: Metadata = {
  title: 'The Squad — 2024/25 Collection | Culé Experience',
  description: 'Explore eight selected Barça player profiles from 2024/25. A cinematic, unofficial fan collection of personalities and tactical roles.',
};

export default function SquadPage() {
  return <>
    <SquadHero />
    <Container size="wide">
      <SquadGrid players={getSquadPlayers()} />
      <div className="mb-16 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs text-muted-foreground sm:flex-row">
        <p>Original number artwork. An unofficial fan perspective.</p>
        <a className="squad-text-link" href={squadEdition.sourceUrl}>2024/25 shirt-number source ↗</a>
      </div>
    </Container>
  </>;
}
