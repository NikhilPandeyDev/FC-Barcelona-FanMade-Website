'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS } from '@/lib/motion';
import type { SquadProfile } from '@/lib/schemas/squad';
import { SquadFilters, type SquadFilter } from './SquadFilters';
import { PlayerCard } from './PlayerCard';

export function SquadGrid({ players }: { players: SquadProfile[] }) {
  const [selected, setSelected] = useState<SquadFilter>('All');
  const reduced = useReducedMotion();
  const filtered = players.filter((player) => selected === 'All' || player.position === selected);
  return (
    <section className="pb-20 pt-8 sm:pb-28" aria-labelledby="collection-title">
      <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-4 xl:flex-row xl:items-center">
        <h2 id="collection-title" className="sr-only">Explore the player collection</h2>
        <SquadFilters selected={selected} onChange={setSelected} />
        <p role="status" aria-atomic="true" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{String(filtered.length).padStart(2, '0')} {filtered.length === 1 ? 'profile' : 'profiles'} / {selected}</p>
      </div>
      <div id="squad-grid" className="squad-results">
        {filtered.length ? (
          <ul className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((player, index) => (
              <motion.li
                key={player.id}
                layout={reduced ? false : 'position'}
                className="min-w-0"
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.3,
                  delay: reduced ? 0 : Math.min(index, 3) * 0.035,
                  ease: EASINGS.editorial,
                  layout: { duration: 0.25, delay: 0, ease: EASINGS.editorial },
                }}
              >
                <PlayerCard player={player} />
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="border-y border-white/10 py-20 text-center">
            <h3 className="font-display text-2xl font-bold">No profiles in this selection.</h3>
            <p className="mt-3 text-muted-foreground">This archive is still growing.</p>
            <button className="squad-text-link mt-6" onClick={() => setSelected('All')}>View all profiles</button>
          </div>
        )}
      </div>
    </section>
  );
}
