import Link from 'next/link';
import type { Match } from '@/lib/schemas/matches';
import { Reveal } from '@/components/motion/Reveal';
import { MatchScoreboard } from './MatchScoreboard';
import styles from './matches.module.css';

export function FeaturedMatch({ match }: { match: Match }) {
  return <section aria-labelledby="featured-match-title" className={styles.feature}>
    <div className={styles.featureIntro}><span className={styles.kicker}>IN FOCUS / {match.competition.season}</span><h2 id="featured-match-title">{match.editorial.title}</h2><p>{match.editorial.description}</p></div>
    <Reveal direction="up" duration={0.5}><MatchScoreboard match={match} /></Reveal>
    <Link className={styles.featureLink} href={`/matches/${match.id}`}>Enter the match <span aria-hidden="true">↗</span></Link>
  </section>;
}
