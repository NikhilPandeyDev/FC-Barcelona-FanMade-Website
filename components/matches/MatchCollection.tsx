'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MatchSummary } from '@/lib/schemas/matches';
import { filterMatches, type MatchFilter } from '@/lib/matches/presentation';
import { MatchFilters } from './MatchFilters';
import { MatchCard } from './MatchCard';
import { MatchEmpty } from './MatchPrimitives';
import styles from './matches.module.css';

export function MatchCollection({ matches }: { matches: MatchSummary[] }) {
  const [status, setStatus] = useState<MatchFilter>('All');
  const [competition, setCompetition] = useState('All');
  const reduced = useReducedMotion();
  const visible = filterMatches(matches, status, competition);
  const competitions = Array.from(new Set(matches.map((match) => match.competition.name)));
  return <section className={styles.collection} aria-labelledby="archive-heading">
    <div className={styles.archiveTitle}><div><span className={styles.kicker}>THE MATCH ARCHIVE</span><h2 id="archive-heading">Every moment matters.</h2></div><p>Selected matches from 2024/25.<br />An archive, not the current schedule.</p></div>
    <MatchFilters status={status} competition={competition} competitions={competitions} onStatus={setStatus} onCompetition={setCompetition} />
    <p className={styles.resultCount} role="status" aria-live="polite" aria-atomic="true">{visible.length} {visible.length === 1 ? 'match' : 'matches'} · {status} · {competition === 'All' ? 'All competitions' : competition}</p>
    <div id="match-list">
      {visible.length ? <div key={`${status}-${competition}`} className={styles.cardGrid}>{visible.map((match, index) => <motion.div key={match.id} initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? .15 : .25, delay: reduced ? 0 : index * .04 }}><MatchCard match={match} /></motion.div>)}</div> : <MatchEmpty title={status === 'Upcoming' ? 'The next chapter is still to come.' : 'No matches in this selection.'}>{status === 'Upcoming' ? 'No upcoming fixtures are included in this curated archive.' : 'Try another competition or return to all matches.'}</MatchEmpty>}
      {(status !== 'All' || competition !== 'All') && <button type="button" className={styles.reset} onClick={() => { setStatus('All'); setCompetition('All'); }}>Reset filters</button>}
    </div>
  </section>;
}
