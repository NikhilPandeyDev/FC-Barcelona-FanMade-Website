'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function SquadError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <Container className="min-h-[75vh] py-40"><p className="squad-kicker">A pause in play</p><h1 className="mt-5 font-display text-4xl font-bold">The collection could not load.</h1><p className="mt-4 text-muted-foreground">Try opening it again.</p><div className="mt-8 flex gap-8"><button className="squad-text-link min-h-11" onClick={reset}>Try again</button><Link className="squad-text-link inline-flex min-h-11 items-center" href="/squad">Back to squad</Link></div></Container>;
}
