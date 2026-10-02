import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoadingMatches from '@/components/matches/LoadingMatches';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { FeaturedMatch } from '@/components/matches/FeaturedMatch';
import { MatchCollection } from '@/components/matches/MatchCollection';
import Link from 'next/link';
import { getFeaturedMatch, getMatches } from '@/data/match-center';
import { getBarcelonaFixtures } from '@/lib/football/server';
import { selectFeaturedMatch, summarizeMatches } from '@/lib/football/presentation';
import { FootballDataNotice } from '@/components/football/FootballDataNotice';
import { LeagueTable } from '@/components/football/LeagueTable';
import styles from '@/components/matches/matches.module.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Match Center — Fixtures & Results | Culé Experience', description: 'Barça fixtures, results and a selected historical archive in the unofficial Culé Match Center. Provider snapshots may be delayed.' };
export default function MatchesPage() { return <Suspense fallback={<LoadingMatches />}><MatchesContent /></Suspense>; }
async function MatchesContent() {
  const result = await getBarcelonaFixtures();
  const archive = result.mode !== 'provider';
  const featured = archive ? getFeaturedMatch() : selectFeaturedMatch(result.data);
  return <Container size="wide">
    <header className={styles.hubHero}><Reveal direction="up"><p className={styles.kicker}>THE MOMENT / CULÉ EXPERIENCE</p><h1>MATCH<span>CENTER.</span></h1></Reveal><div className={styles.heroBottom}><p>The first whistle. The impossible finish. The feeling that stays. Step back inside the moments that made the match.</p><span className={styles.edition}>{archive ? '2024/25 · Selected archive' : 'Fixtures & results · Delayed snapshot'}</span></div></header>
    <FootballDataNotice result={result} />
    {featured && <FeaturedMatch match={featured} />}
    <MatchCollection matches={summarizeMatches(result.data)} archive={archive} />
    <LeagueTable />
    {!archive && <nav aria-label="Historical match archive" className="mb-10"><h2 className="font-display text-xl font-bold">The 2024/25 archive</h2><div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">{getMatches().map((match) => <Link key={match.id} className={styles.source} href={`/matches/${match.id}`}>{match.homeTeam.shortName} vs {match.awayTeam.shortName} →</Link>)}</div></nav>}
    <p className={styles.editionNote}>Unofficial fan-made experience. Original team monograms; no official crest artwork.</p>
  </Container>;
}
