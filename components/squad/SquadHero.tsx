import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { squadEdition } from '@/data/players';

export function SquadHero() {
  return (
    <section className="squad-hero relative overflow-hidden border-b border-white/10 pb-12 pt-36 sm:pb-16 sm:pt-44" aria-labelledby="squad-title">
      <div className="squad-light" aria-hidden="true" />
      <Container size="wide" className="relative">
        <p className="squad-kicker">The Culé collection / {squadEdition.season}</p>
        <Reveal duration={0.55} clip className="mt-7">
          <h1 id="squad-title" className="squad-title">THE<br /><span className="squad-title-outline">SQUAD.</span></h1>
        </Reveal>
        <div className="mt-9 grid gap-8 border-t border-white/20 pt-7 md:grid-cols-2 md:items-end">
          <Reveal delay={0.12} duration={0.55}>
            <p className="max-w-lg text-lg leading-relaxed text-foreground sm:text-xl">Different instincts. A shared language.<br /><span className="text-muted-foreground">Meet the players. Read the game.</span></p>
          </Reveal>
          <div className="max-w-md md:justify-self-end">
            <p className="squad-kicker">{squadEdition.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{squadEdition.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
