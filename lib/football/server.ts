import 'server-only';
import { createHash } from 'node:crypto';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { createFootballDataProvider } from './provider';
import { createFootballService } from './service';
import { FOOTBALL_CACHE, type FootballProvider } from './types';
import { getMatches } from '@/data/match-center';

let active: { fingerprint: string; provider: FootballProvider } | undefined;
function service() {
  const mode = process.env.FOOTBALL_DATA_MODE ?? 'auto';
  if (mode === 'curated') return createFootballService(null, getMatches(), 'offline');
  if (mode !== 'auto') return createFootballService(null, getMatches(), 'configuration');
  const token = process.env.FOOTBALL_DATA_API_KEY?.trim();
  if (!token) return createFootballService(null, getMatches());
  if (!/^[A-Za-z0-9_-]{16,200}$/.test(token)) return createFootballService(null, getMatches(), 'configuration');
  // Cache identity changes when credentials change. Only the digest is persisted.
  const fingerprint = createHash('sha256').update(token).digest('hex');
  if (!active || active.fingerprint !== fingerprint) {
    const raw = createFootballDataProvider(token);
    active = { fingerprint, provider: {
      getFixtures: unstable_cache(() => raw.getFixtures(), ['football-v1', fingerprint, 'fixtures'], { revalidate: FOOTBALL_CACHE.fixtures }),
      getTeam: unstable_cache(() => raw.getTeam(), ['football-v1', fingerprint, 'team'], { revalidate: FOOTBALL_CACHE.team }),
      getMatch: unstable_cache((id: string) => raw.getMatch(id), ['football-v1', fingerprint, 'match'], { revalidate: FOOTBALL_CACHE.match }),
      getStandings: unstable_cache(() => raw.getStandings(), ['football-v1', fingerprint, 'standings'], { revalidate: FOOTBALL_CACHE.standings }),
    } };
  }
  return createFootballService(active.provider, getMatches());
}

// React cache deduplicates access within one server render. Next's data cache
// stores only successful normalized provider results across requests.
export const getBarcelonaFixtures = cache(() => service().getFixtures());
export const getBarcelonaMatch = cache((id: string) => service().getMatch(id));
export const getBarcelonaTeam = cache(() => service().getTeam());
export const getBarcelonaStandings = cache(() => service().getStandings());
