import type { Match } from '@/lib/schemas/matches';
import { Reveal } from '@/components/motion/Reveal';
import { MatchEmpty, MatchSectionHeading, SourceLink } from './MatchPrimitives';
import styles from './matches.module.css';

const eventLabels = { GOAL: 'Goal', YELLOW_CARD: 'Yellow card', RED_CARD: 'Red card', SUBSTITUTION: 'Substitution' };
export function MatchTimeline({ match }: { match: Match }) {
  const events = match.events;
  return <section id="timeline" className={styles.detailSection} aria-labelledby="timeline-title">
    <div id="timeline-title"><MatchSectionHeading number="01" title="The turning points." description={events?.coverage ?? 'The story, minute by minute.'} /></div>
    {events?.items.length ? <>
      <div className={styles.timelineTeams}><span>{match.homeTeam.name}</span><span>{match.awayTeam.name}</span></div>
      <ol className={styles.timeline}>{events.items.map((event) => <li key={event.id} className={event.side === 'away' ? styles.awayEvent : styles.homeEvent}>
        <span className={styles.minute}>{event.minute}{event.addedTime ? `+${event.addedTime}` : ''}′</span>
        <div className={styles.eventBody}><Reveal direction="up" duration={0.4}><span className={styles.kicker}>{eventLabels[event.type]} <span aria-hidden="true">/</span> {match[`${event.side}Team`].shortName}</span><h3>{event.player}</h3>{event.assist && <p>Assist: {event.assist}</p>}{event.detail && <p>{event.detail}</p>}</Reveal></div>
      </li>)}</ol><SourceLink source={events.source} />
    </> : <MatchEmpty title="Event timeline unavailable.">Verified minute-by-minute events have not been added for this match.</MatchEmpty>}
  </section>;
}
