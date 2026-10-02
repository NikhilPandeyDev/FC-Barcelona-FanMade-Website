'use client';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import styles from '@/components/matches/matches.module.css';
export default function MatchError({ reset }: { reset: () => void }) { return <Container size="wide"><div className={styles.loading} role="alert"><h1>The match archive could not load.</h1><p className="mt-4 text-muted-foreground">Try again to reopen this match.</p><button type="button" className={styles.reset} onClick={reset}>Try again</button><br /><Link className={styles.back} href="/matches">Return to Match Center →</Link></div></Container>; }
