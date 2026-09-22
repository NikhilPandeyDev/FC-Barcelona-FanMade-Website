import { Container } from '@/components/ui/Container';

export default function SquadLoading() {
  return <Container size="wide" className="min-h-[75vh] pb-20 pt-40"><p role="status" className="squad-kicker">Opening the collection…</p><div aria-hidden="true" className="mt-10 h-40 border-y border-white/10 bg-card" /><div aria-hidden="true" className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{[0, 1, 2, 3].map((item) => <div key={item} className="h-96 bg-card" />)}</div></Container>;
}
