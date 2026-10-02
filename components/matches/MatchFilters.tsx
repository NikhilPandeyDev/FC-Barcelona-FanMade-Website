'use client';

import { matchFilters, type MatchFilter } from '@/lib/matches/presentation';
import styles from './matches.module.css';

type Props = { status: MatchFilter; competition: string; competitions: string[]; onStatus: (value: MatchFilter) => void; onCompetition: (value: string) => void };
export function MatchFilters({ status, competition, competitions, onStatus, onCompetition }: Props) {
  return <div className={styles.filters}>
    <div role="group" aria-label="Match status" className={styles.filterButtons}>{matchFilters.map((filter) => <button key={filter} type="button" aria-pressed={status === filter} aria-controls="match-list" onClick={() => onStatus(filter)}>{filter}</button>)}</div>
    <label className={styles.selectLabel}>Competition<select value={competition} onChange={(event) => onCompetition(event.target.value)} aria-controls="match-list"><option value="All">All competitions</option>{competitions.map((name) => <option key={name} value={name}>{name}</option>)}</select></label>
  </div>;
}
