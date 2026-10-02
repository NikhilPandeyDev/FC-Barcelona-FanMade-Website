import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { FeaturedMatch } from '../matches/FeaturedMatch';
import { getFeaturedMatch } from '@/data/match-center';
import { getBarcelonaFixtures } from '@/lib/football/server';
import { selectFeaturedMatch } from '@/lib/football/presentation';
import { FootballDataNotice } from '@/components/football/FootballDataNotice';

export async function MatchSpotlight() {
  const result = await getBarcelonaFixtures();
  const archived = result.mode !== 'provider';
  const featured = archived ? getFeaturedMatch() : selectFeaturedMatch(result.data);
  return <Section id="matches" kicker={archived ? 'THE MATCH ARCHIVE' : 'THE MATCH CENTER'} title="Nights that stay with us." subtitle={archived ? 'Revisit selected matches from 2024/25 in the cinematic Match Center.' : 'Fixtures, results and match stories in the cinematic Match Center.'} containerSize="wide" headerRight={<Button href="/matches" variant="outline">Explore Match Center →</Button>}>
    <FootballDataNotice result={result} />
    {featured ? <FeaturedMatch match={featured} /> : <p className="text-muted-foreground">No matches are available in this provider snapshot.</p>}
  </Section>;
}
