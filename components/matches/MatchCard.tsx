import Link from 'next/link';
import type { MatchSummary } from '@/lib/schemas/matches';
import { matchDate, matchStatus } from '@/lib/matches/presentation';
import { TeamMark } from './MatchPrimitives';
import styles from './matches.module.css';

export function MatchCard({ match }: { match: MatchSummary }) {
  return <article className={styles.card}>
    <Link href={`/matches/${match.id}`} className={styles.cardLink}>
      <div className={styles.cardMeta}><span>{match.competition.name}</span><time dateTime={match.kickoff ?? undefined}>{matchDate(match.kickoff)}</time></div>
      <h3 className="sr-only">{match.homeTeam.name} vs {match.awayTeam.name}</h3>
      {(['home', 'away'] as const).map((side) => <div key={side} className={styles.cardTeam}><TeamMark team={match[`${side}Team`]} /><span>{match[`${side}Team`].name}<small>{side}</small></span><strong>{match.score?.[side] ?? '–'}</strong></div>)}
      <div className={styles.cardFooter}><span>{matchStatus(match.status)}</span><span>Match story <span aria-hidden="true">↗</span></span></div>
    </Link>
  </article>;
}
