import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { FeaturedMatch } from '@/components/matches/FeaturedMatch';
import { MatchCollection } from '@/components/matches/MatchCollection';
import { getFeaturedMatch, getMatchSummaries } from '@/data/match-center';
import styles from '@/components/matches/matches.module.css';

export const metadata: Metadata = { title: 'Match Center — 2024/25 Archive | Culé Experience', description: 'Relive selected Barça matches through scores, turning points and verified match details. An unofficial 2024/25 fan archive.' };
export default function MatchesPage() {
  return <Container size="wide">
    <header className={styles.hubHero}><Reveal direction="up"><p className={styles.kicker}>THE MOMENT / CULÉ EXPERIENCE</p><h1>MATCH<span>CENTER.</span></h1></Reveal><div className={styles.heroBottom}><p>The first whistle. The impossible finish. The feeling that stays. Step back inside the moments that made the match.</p><span className={styles.edition}>2024/25 · Selected archive</span></div></header>
    <FeaturedMatch match={getFeaturedMatch()} />
    <MatchCollection matches={getMatchSummaries()} />
    <p className={styles.editionNote}>Unofficial fan-made experience. Original team monograms; no official crest artwork.</p>
  </Container>;
}
