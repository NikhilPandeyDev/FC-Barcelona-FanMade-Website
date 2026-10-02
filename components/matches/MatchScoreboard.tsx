import type { Match } from '@/lib/schemas/matches';
import { matchDate, matchStatus } from '@/lib/matches/presentation';
import { TeamMark } from './MatchPrimitives';
import styles from './matches.module.css';

export function MatchScoreboard({ match }: { match: Match }) {
  return <div className={styles.scoreboard}>
    <div className={styles.scoreMeta}><span>{match.competition.name}</span><span>{match.competition.round}</span></div>
    <div className={styles.teams}>
      <div className={styles.team}><TeamMark team={match.homeTeam} /><span className={styles.teamName}>{match.homeTeam.name}</span><span className={styles.kicker}>HOME</span></div>
      <div className={styles.scoreCenter}>
        <span className={styles.status}>{matchStatus(match.status)}</span>
        <div className={styles.score} aria-label={match.score ? `${match.homeTeam.name} ${match.score.home}, ${match.awayTeam.name} ${match.score.away}` : `${match.homeTeam.name} versus ${match.awayTeam.name}`}>
          {match.score ? <><span>{match.score.home}</span><span className={styles.scoreDash} aria-hidden="true">:</span><span>{match.score.away}</span></> : <span className={styles.versus}>VS</span>}
        </div>
        {match.halfTime && <span className={styles.halfTime}>HT {match.halfTime.home} – {match.halfTime.away}</span>}
      </div>
      <div className={styles.team}><TeamMark team={match.awayTeam} /><span className={styles.teamName}>{match.awayTeam.name}</span><span className={styles.kicker}>AWAY</span></div>
    </div>
    <div className={styles.scoreFooter}><time dateTime={match.kickoff ?? undefined}>{matchDate(match.kickoff, true)}</time><span>{match.venue ?? 'Venue to be confirmed'}</span></div>
  </div>;
}
