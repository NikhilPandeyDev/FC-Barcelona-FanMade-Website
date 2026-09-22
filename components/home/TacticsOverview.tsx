'use client';

import React from 'react';
import { Target, Activity, Flame, Zap, Shield, ArrowUpRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';

const tacticalPillars = [
  {
    title: 'High-Press Intensity (PPDA: 7.8)',
    description: 'Relentless suffocating press in the final third, forcing opponent turnovers within 5 seconds of loss.',
    metric: '1st in Europe',
    icon: Flame,
    color: 'text-grana-400',
  },
  {
    title: 'Positional Dominance & Field Tilt',
    description: 'Sustained possession in the opponent half with over 64% territory control across all competitions.',
    metric: '64.2%',
    icon: Target,
    color: 'text-blau-400',
  },
  {
    title: 'Offside Trap Precision',
    description: 'Disciplined high defensive line executed with millimeter synchronization by Cubarsí and Martínez.',
    metric: '7.1 Offsides/90',
    icon: Shield,
    color: 'text-gold-400',
  },
  {
    title: 'xG Creation Powerhouse',
    description: 'Leading European football in high-quality chances created from open play and transitional speed.',
    metric: '2.74 xG/Game',
    icon: Zap,
    color: 'text-emerald-400',
  },
];

export function TacticsOverview() {
  return (
    <Section
      id="stats"
      kicker="TACTICAL BLUEPRINT"
      title="Positional Play Reimagined"
      subtitle="The tactical evolution under Hansi Flick: marrying Cruyffian positional geometry with modern German verticality."
      containerSize="wide"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tacticalPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.title} delay={idx * 0.1}>
              <div className="h-full bg-card rounded-3xl border border-white/10 p-6 flex flex-col justify-between hover:border-gold-500/30 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6">
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>

                  <span className="font-mono text-xs uppercase text-gold-400 tracking-wider block mb-2 font-bold">
                    {pillar.metric}
                  </span>

                  <h3 className="font-display text-xl font-bold uppercase text-white mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>SEASON 24/25</span>
                  <Activity className="w-3.5 h-3.5 text-gold-400" />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
