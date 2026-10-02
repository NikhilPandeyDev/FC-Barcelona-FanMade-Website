import type { MatchSource, Team } from '@/lib/schemas/matches';
import styles from './matches.module.css';

export function TeamMark({ team }: { team: Team }) {
  return <span aria-hidden="true" className={`${styles.teamMark} ${team.id === 'barcelona' ? styles.barcaMark : ''}`}>{team.shortName}</span>;
}
export function SourceLink({ source }: { source: MatchSource }) {
  return <a className={styles.source} href={source.url}>{source.title} <span aria-hidden="true">↗</span></a>;
}
export function MatchEmpty({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className={styles.empty}><span aria-hidden="true" className={styles.emptyDash}>—</span><h3>{title}</h3><p>{children}</p></div>;
}
export function MatchSectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className={styles.sectionHeading}><span className={styles.kicker}>{number} / MATCH FILE</span><h2>{title}</h2><p>{description}</p></div>;
}
