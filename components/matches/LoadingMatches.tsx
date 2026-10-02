import { Container } from '@/components/ui/Container';
import styles from '@/components/matches/matches.module.css';
export default function LoadingMatches() { return <Container size="wide"><div className={styles.loading} role="status"><p className={styles.kicker}>MATCH CENTER</p><h1>Opening the Match Center…</h1><div aria-hidden="true" className={styles.loadingPanel} /></div></Container>; }
