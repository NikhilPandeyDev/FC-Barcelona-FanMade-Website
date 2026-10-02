import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FeaturedMatch } from '../matches/FeaturedMatch';
import { getFeaturedMatch } from '@/data/match-center';

export function MatchSpotlight() {
  return <Section id="matches" kicker="THE MATCH ARCHIVE" title="Nights that stay with us." subtitle="Revisit selected matches from 2024/25 in the cinematic Match Center." containerSize="wide" headerRight={<Button href="/matches" variant="outline">Explore Match Center →</Button>}>
    <FeaturedMatch match={getFeaturedMatch()} />
  </Section>;
}
