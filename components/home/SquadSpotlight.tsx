'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { players } from '@/data/players';
import { PlayerPosition } from '@/data/types';

const positions: Array<'ALL' | PlayerPosition> = ['ALL', 'Forward', 'Midfielder', 'Defender', 'Goalkeeper'];

export function SquadSpotlight() {
  const [selectedPosition, setSelectedPosition] = useState<'ALL' | PlayerPosition>('ALL');

  const filteredPlayers =
    selectedPosition === 'ALL'
      ? players
      : players.filter((p) => p.position === selectedPosition);

  return (
    <Section
      id="squad"
      kicker="LA MASIA & FIRST TEAM"
      title="The Protagonists"
      subtitle="The stars carrying the timeless philosophy into the future. Discover key metrics, roles, and profiles."
      containerSize="wide"
      headerRight={<Button href="/squad" variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>Explore the squad</Button>}
    >
      {/* Position Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setSelectedPosition(pos)}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              selectedPosition === pos
                ? 'bg-gold-500 text-black font-bold shadow-lg shadow-gold-950/40'
                : 'bg-card text-muted-foreground hover:text-white border border-white/10'
            }`}
          >
            {pos}
          </button>
        ))}
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlayers.map((player, idx) => (
          <Reveal key={player.id} delay={idx * 0.08}>
            <div className="group relative bg-card rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-blau-500/50 hover:shadow-2xl hover:shadow-blau-950/40 transition-all duration-300">
              {/* Card Top: Number & Badges */}
              <div className="p-6 pb-2 flex items-start justify-between">
                <span className="font-mono text-4xl sm:text-5xl font-black text-white/10 group-hover:text-gold-400/30 transition-colors">
                  #{player.number}
                </span>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant="outline" size="sm">
                    {player.position}
                  </Badge>
                  {player.isLaMasia && (
                    <Badge variant="gold" size="sm">
                      <Sparkles className="w-2.5 h-2.5 inline" /> LA MASIA
                    </Badge>
                  )}
                </div>
              </div>

              {/* Player Image & Name */}
              <div className="px-6 py-4 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-2xl overflow-hidden border border-white/10 bg-obsidian-900 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={player.photoUrl}
                    alt={player.displayName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-60" />
                </div>

                <span className="font-mono text-xs uppercase text-gold-400 tracking-wider">
                  {player.specificRole}
                </span>
                <h3 className="font-display text-2xl font-black uppercase text-white mt-1 group-hover:text-gold-300 transition-colors">
                  {player.displayName}
                </h3>
              </div>

              {/* Season Key Stats */}
              <div className="p-6 pt-4 border-t border-white/10 bg-obsidian-900/60 flex items-center justify-around text-center font-mono">
                <div>
                  <span className="block text-xl font-bold text-white">
                    {player.statsSeason.goals}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">Goals</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div>
                  <span className="block text-xl font-bold text-white">
                    {player.statsSeason.assists}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">Assists</span>
                </div>
                <div className="w-[1px] h-6 bg-white/10" />
                <div>
                  <span className="block text-xl font-bold text-gold-400">
                    {player.statsSeason.ratingAvg.toFixed(1)}
                  </span>
                  <span className="text-[10px] uppercase text-muted-foreground">Rating</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
