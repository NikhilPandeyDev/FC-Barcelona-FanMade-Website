'use client';

import React from 'react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { stadiumInfo } from '@/data/stadium';
import { Sun, Users, Tv, Trees, ArrowUpRight } from 'lucide-react';

const iconMap = {
  Sun,
  Users,
  Tv,
  Trees,
};

export function StadiumSpotlight() {
  return (
    <Section
      id="stadium"
      kicker="ESPAI BARÇA"
      title="The Rebirth of Camp Nou"
      subtitle="Europe’s largest football temple is reborn into a state-of-the-art 105,000-seat architectural landmark."
      containerSize="wide"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Stadium Overview Card */}
        <div className="lg:col-span-7 flex flex-col">
          <Reveal direction="left">
            <div className="h-full bg-gradient-to-br from-card via-obsidian-900 to-blau-950/40 border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="gold" size="sm">
                    INAUGURATION 1957 • REBORN 2026
                  </Badge>
                  <Badge variant="outline" size="sm">
                    105,000 CAPACITY
                  </Badge>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white mb-4">
                  Spotify Camp Nou
                </h3>

                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  The Espai Barça project completely modernizes the sacred temple of Catalonia with an eco-sustainable solar roof, 360° LED scoreboard ring, open urban pedestrian concourses, and world-class acoustics for the roar of 105,000 Culés.
                </p>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-white/10">
                  {stadiumInfo.architecturalHighlights.map((hl) => (
                    <div key={hl.label}>
                      <span className="font-mono text-xl sm:text-2xl font-bold text-white block">
                        {hl.value}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-gold-400 font-bold block mt-0.5">
                        {hl.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground block">
                        {hl.sublabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">
                  Location: C. d’Arístides Maillol, 12, Les Corts, Barcelona
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stadium Features Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {stadiumInfo.features.map((feat, idx) => {
            const Icon = (iconMap as any)[feat.icon] || Users;
            return (
              <Reveal key={feat.title} delay={idx * 0.1} direction="right">
                <div className="bg-card border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:border-gold-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold uppercase text-white">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
