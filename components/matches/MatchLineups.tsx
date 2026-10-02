import type { Lineup, Match, Team } from '@/lib/schemas/matches';
import { MatchEmpty, MatchSectionHeading, SourceLink } from './MatchPrimitives';
import styles from './matches.module.css';

export function TacticalPitch({ lineup, team }: { lineup: Lineup; team: Team }) {
  const hasPositions = lineup.starters.every((player) => player.x !== undefined && player.y !== undefined);
  if (!hasPositions) return <p className={styles.tacticalNote}>Formation and pitch positions are not verified in this edition.</p>;
  return <figure className={styles.tacticalFigure}><div className={styles.pitch} aria-hidden="true"><span className={styles.pitchCircle} />{lineup.starters.map((player) => <span key={player.number} className={styles.pitchPlayer} style={{ left: `${player.x}%`, top: `${player.y}%` }}>{player.number}</span>)}</div><figcaption>{team.name} · {lineup.formation ?? 'Published starting positions'}<br />Schematic starting positions; not player tracking.</figcaption></figure>;
}
function TeamLineup({ lineup, team }: { lineup: Lineup | null; team: Team }) {
  return <div className={styles.lineup}><h3>{team.name}</h3>{lineup ? <>
    <TacticalPitch lineup={lineup} team={team} />
    <ol className={styles.playerList}>{lineup.starters.map((player) => <li key={player.number}><span>{player.number}</span><strong>{player.name}</strong>{player.position && <small>{player.position}</small>}</li>)}</ol>
    {lineup.substitutes?.length ? <details><summary>Substitutes</summary><ul className={styles.playerList}>{lineup.substitutes.map((player) => <li key={player.number}><span>{player.number}</span>{player.name}</li>)}</ul></details> : <p className={styles.tacticalNote}>Substitutes are not included in this edition.</p>}
    <SourceLink source={lineup.source} />
  </> : <p>Verified starting XI unavailable.</p>}</div>;
}
export function MatchLineups({ match }: { match: Match }) {
  return <section id="lineups" className={styles.detailSection} aria-labelledby="lineups-title"><div id="lineups-title"><MatchSectionHeading number="03" title="The starting eleven." description="The teams selected for the first whistle." /></div>
    {match.lineups && (match.lineups.home || match.lineups.away) ? <div className={styles.lineupGrid}><TeamLineup lineup={match.lineups.home} team={match.homeTeam} /><TeamLineup lineup={match.lineups.away} team={match.awayTeam} /></div> : <MatchEmpty title="Lineups & tactical shape unavailable.">Verified starting XIs and positional data have not been added for this match.</MatchEmpty>}
  </section>;
}
