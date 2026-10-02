import type { Match } from '@/lib/schemas/matches';
import { MatchEmpty, MatchSectionHeading, SourceLink } from './MatchPrimitives';
import styles from './matches.module.css';

export function MatchStats({ match }: { match: Match }) {
  return <section id="statistics" className={styles.detailSection} aria-labelledby="statistics-title">
    <div id="statistics-title"><MatchSectionHeading number="02" title="Behind the score." description="The match in numbers. Home on the left, away on the right." /></div>
    {match.stats?.items.length ? <div className={styles.statsPanel}>
      <div className={styles.statTeams}><span>{match.homeTeam.name}</span><span>{match.awayTeam.name}</span></div>
      <dl className={styles.stats}>{match.stats.items.map((stat) => {
        const total = stat.home + stat.away;
        return <div key={stat.id} className={styles.statRow}><dt>{stat.label}</dt><dd><span>{stat.home}{stat.unit === 'percent' ? '%' : ''}<span className="sr-only"> {match.homeTeam.name}</span></span><span>{stat.away}{stat.unit === 'percent' ? '%' : ''}<span className="sr-only"> {match.awayTeam.name}</span></span></dd><div aria-hidden="true" className={styles.statBar}><span style={{ width: `${total ? stat.home / total * 100 : 0}%` }} /><span style={{ width: `${total ? stat.away / total * 100 : 0}%` }} /></div></div>;
      })}</dl><SourceLink source={match.stats.source} />
    </div> : <MatchEmpty title="Statistics unavailable.">Verified match statistics have not been added for this match.</MatchEmpty>}
  </section>;
}
