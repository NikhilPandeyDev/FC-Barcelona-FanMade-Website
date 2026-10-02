import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { MatchScoreboard } from '@/components/matches/MatchScoreboard';
import { MatchTimeline } from '@/components/matches/MatchTimeline';
import { MatchStats } from '@/components/matches/MatchStats';
import { MatchLineups } from '@/components/matches/MatchLineups';
import { SourceLink } from '@/components/matches/MatchPrimitives';
import { getBarcelonaMatch } from '@/lib/football/server';
import { FootballDataNotice } from '@/components/football/FootballDataNotice';
import styles from '@/components/matches/matches.module.css';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data: match, reason } = await getBarcelonaMatch(params.id);
  if (!match && reason === 'not_found') notFound();
  if (!match) return { title: 'Match unavailable | Culé Experience' };
  return { title: `${match.homeTeam.name} vs ${match.awayTeam.name} | Culé Experience`, description: `${match.editorial.description} An unofficial ${match.competition.season} match experience.` };
}
export default async function MatchPage({ params }: { params: { id: string } }) {
  const result = await getBarcelonaMatch(params.id);
  const match = result.data;
  if (!match && result.reason === 'not_found') notFound();
  if (!match) return <Container size="wide"><div className={styles.loading}><h1>Match data is temporarily unavailable.</h1><p className="mt-4 text-muted-foreground">Return to the Match Center to explore the available matches and archive.</p><Link className={styles.back} href="/matches">← Back to Match Center</Link></div></Container>;
  return <Container size="wide">
    <header className={styles.detailHero}><Link className={styles.back} href="/matches">← Back to Match Center</Link><Reveal direction="up"><div className={styles.detailTitle}><p className={styles.kicker}>{match.competition.season} / {match.dataKind === 'provider' ? 'MATCH SNAPSHOT' : 'MATCH ARCHIVE'}</p><h1>{match.editorial.title}</h1><p>{match.editorial.description}</p></div></Reveal><FootballDataNotice result={result} archive={match.dataKind === 'curated'} /><div className={styles.detailBoard}><MatchScoreboard match={match} /></div></header>
    <nav aria-label="Match sections" className={styles.sectionNav}><a href="#timeline">01 / Timeline</a><a href="#statistics">02 / Statistics</a><a href="#lineups">03 / Lineups & tactics</a></nav>
    <MatchTimeline match={match} /><MatchStats match={match} /><MatchLineups match={match} />
    <div className={styles.editionNote}><p>{match.dataKind === 'provider' ? `Provider snapshot · ${match.updatedAt ? `updated ${match.updatedAt}` : 'update time unavailable'}` : `Historical match · verified ${match.source.verifiedAt}`}<br />An unofficial fan perspective. Team marks are original monograms.</p><SourceLink source={match.source} /><Link className={styles.source} href="/matches">Explore the Match Center →</Link></div>
  </Container>;
}
