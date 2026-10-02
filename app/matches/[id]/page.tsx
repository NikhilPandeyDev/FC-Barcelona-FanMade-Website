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
import { getMatchById, getMatches } from '@/data/match-center';
import styles from '@/components/matches/matches.module.css';

export const dynamicParams = false;
export function generateStaticParams() { return getMatches().map(({ id }) => ({ id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const match = getMatchById(params.id);
  if (!match) return { title: 'Match not found | Culé Experience' };
  return { title: `${match.homeTeam.name} vs ${match.awayTeam.name} | Culé Experience`, description: `${match.editorial.description} An unofficial ${match.competition.season} match archive.` };
}
export default function MatchPage({ params }: { params: { id: string } }) {
  const match = getMatchById(params.id);
  if (!match) notFound();
  return <Container size="wide">
    <header className={styles.detailHero}><Link className={styles.back} href="/matches">← Back to Match Center</Link><Reveal direction="up"><div className={styles.detailTitle}><p className={styles.kicker}>{match.competition.season} / MATCH ARCHIVE</p><h1>{match.editorial.title}</h1><p>{match.editorial.description}</p></div></Reveal><div className={styles.detailBoard}><MatchScoreboard match={match} /></div></header>
    <nav aria-label="Match sections" className={styles.sectionNav}><a href="#timeline">01 / Timeline</a><a href="#statistics">02 / Statistics</a><a href="#lineups">03 / Lineups & tactics</a></nav>
    <MatchTimeline match={match} /><MatchStats match={match} /><MatchLineups match={match} />
    <div className={styles.editionNote}><p>Historical match · verified {match.source.verifiedAt}<br />An unofficial fan perspective. Team marks are original monograms.</p><SourceLink source={match.source} /><Link className={styles.source} href="/matches">Explore the match archive →</Link></div>
  </Container>;
}
