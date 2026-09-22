'use client';

import React from 'react';
import { Shield, Clock, MapPin, Tv, CheckCircle2, ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { matches } from '@/data/matches';
import { formatDate } from '@/lib/utils';

export function MatchSpotlight() {
  const upcomingMatch = matches.find((m) => m.status === 'UPCOMING') || matches[0];
  const lastMatch = matches.find((m) => m.id === 'm-liga-clasico') || matches[1];

  return (
    <Section
      id="matches"
      kicker="MATCHDAY INTELLIGENCE"
      title="Fixtures & Battlefield"
      subtitle="From high-stakes European nights to historic domestic clashes, track the Blaugrana campaign."
      containerSize="wide"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Next Match Card (Primary Feature) */}
        <div className="lg:col-span-7 flex flex-col">
          <Reveal direction="left">
            <div className="h-full bg-gradient-to-br from-card to-obsidian-900 border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
              {/* Top Meta */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <Badge variant="blau" size="md">
                    {upcomingMatch.competition}
                  </Badge>
                  <span className="font-mono text-xs uppercase text-gold-400 font-semibold">
                    {upcomingMatch.competitionRound}
                  </span>
                </div>

                {/* Scoreboard / Versus Section */}
                <div className="my-8 sm:my-10 flex items-center justify-between gap-4">
                  {/* Barca Team */}
                  <div className="flex flex-col items-center text-center gap-3 flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blau-600/20 border border-blau-500/40 p-1 flex items-center justify-center">
                      <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-gold-400" />
                    </div>
                    <div>
                      <span className="font-display text-lg sm:text-xl font-bold uppercase text-white block">
                        FC BARCELONA
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        HOME
                      </span>
                    </div>
                  </div>

                  {/* VS Badge */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-white/30 tracking-widest">
                      VS
                    </span>
                    <span className="font-mono text-[11px] uppercase text-muted-foreground px-2 py-0.5 rounded bg-white/5">
                      20:00 CET
                    </span>
                  </div>

                  {/* Opponent Team */}
                  <div className="flex flex-col items-center text-center gap-3 flex-1">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 p-1 flex items-center justify-center">
                      <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                    </div>
                    <div>
                      <span className="font-display text-lg sm:text-xl font-bold uppercase text-white block">
                        {upcomingMatch.opponent.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        AWAY
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Fixture Details */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{upcomingMatch.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tv className="w-3.5 h-3.5 text-blau-400" />
                    <span>Broadcast: {upcomingMatch.broadcastInfo?.spain} / {upcomingMatch.broadcastInfo?.usa}</span>
                  </div>
                </div>

                <Button variant="gold" size="sm">
                  Match Preview
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Recent Result / Clásico Highlight */}
        <div className="lg:col-span-5 flex flex-col">
          <Reveal direction="right" delay={0.15}>
            <div className="h-full bg-card border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="success" size="sm">
                    LAST RESULT • VICTORY
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatDate(lastMatch.date)}
                  </span>
                </div>

                <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  EL CLÁSICO
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white mb-4">
                  Real Madrid 0 — 4 FC Barcelona
                </h3>

                {/* Scorers breakdown */}
                <div className="space-y-2 mb-6 font-mono text-xs">
                  {lastMatch.events?.map((ev, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gold-400 font-bold">{ev.minute}&apos;</span>
                        <span className="text-white font-medium">{ev.player}</span>
                      </div>
                      {ev.assistPlayer && (
                        <span className="text-muted-foreground text-[11px]">
                          Ast: {ev.assistPlayer}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Match Stat snippet */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                <div>
                  <span className="block font-mono text-lg font-bold text-white">58%</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">Possession</span>
                </div>
                <div>
                  <span className="block font-mono text-lg font-bold text-gold-400">2.85</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">xG Generated</span>
                </div>
                <div>
                  <span className="block font-mono text-lg font-bold text-white">7/15</span>
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">On Target</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
