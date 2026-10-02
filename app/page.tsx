import { Suspense } from 'react';
import LoadingPage from '@/components/layout/LoadingPage';
import React from 'react';
import { Hero } from '@/components/home/Hero';
import { MatchSpotlight } from '@/components/home/MatchSpotlight';
import { SquadSpotlight } from '@/components/home/SquadSpotlight';
import { TacticsOverview } from '@/components/home/TacticsOverview';
import { HeritageTimeline } from '@/components/home/HeritageTimeline';
import { StadiumSpotlight } from '@/components/home/StadiumSpotlight';
import { FanZoneTeaser } from '@/components/home/FanZoneTeaser';

export const dynamic = 'force-dynamic';

export default function HomePage() { return <Suspense fallback={<LoadingPage />}><HomeContent /></Suspense>; }
function HomeContent() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <MatchSpotlight />
      <SquadSpotlight />
      <TacticsOverview />
      <HeritageTimeline />
      <StadiumSpotlight />
      <FanZoneTeaser />
    </div>
  );
}
