import type { FootballResult } from '@/lib/football/types';
import { matchDate } from '@/lib/matches/presentation';

export function FootballDataNotice({ result, archive = false }: { result: Pick<FootballResult<unknown>, 'mode' | 'reason' | 'retrievedAt'>; archive?: boolean }) {
  return <aside aria-label="Football data source" className="my-6 border-l-2 border-gold-400 pl-4 text-xs leading-relaxed text-muted-foreground">
    {result.mode === 'provider' ? <>
      <p>Delayed provider snapshot{result.retrievedAt ? ` · retrieved ${matchDate(result.retrievedAt, true)}` : ''}. Scores and schedules may be delayed; this page does not update live.</p>
      {result.reason && <p>Detailed match data is temporarily unavailable. Showing the cached fixture snapshot.</p>}
      <a className="inline-flex min-h-11 items-center text-gold-400 underline underline-offset-4" href="https://www.football-data.org/">Football data provided by the Football-Data.org API</a>
    </> : <p>{archive ? 'Historical match from the selected 2024/25 archive.' : 'Current football data is unavailable. Showing the curated 2024/25 archive.'} Verified historical facts and original editorial content.</p>}
  </aside>;
}
