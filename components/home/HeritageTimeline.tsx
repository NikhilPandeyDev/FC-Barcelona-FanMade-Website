'use client';

import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { historicalEras } from '@/data/history';
import { trophies } from '@/data/trophies';
import { Trophy as TrophyIcon, Sparkles, ChevronRight, Award } from 'lucide-react';

export function HeritageTimeline() {
  const [activeEraIndex, setActiveEraIndex] = useState(2); // Pep's era default
  const activeEra = historicalEras[activeEraIndex];

  return (
    <Section
      id="history"
      kicker="LIVING HERITAGE"
      title="125 Years of Football Art"
      subtitle="From Gamper’s founding vision to the Cruyffian revolution and Pep’s sextuple masterpieces."
      containerSize="wide"
    >
      {/* Trophy Haul Highlights Banner */}
      <Reveal direction="up">
        <div className="mb-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trophies.map((tr) => (
            <div
              key={tr.id}
              className="bg-card border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center group hover:border-gold-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-3">
                <TrophyIcon className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-mono text-3xl font-black text-white">
                {tr.totalTitles}
              </span>
              <span className="font-mono text-[11px] uppercase text-muted-foreground mt-1 tracking-wider leading-tight">
                {tr.name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Interactive Timeline Era Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Era Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-bold mb-2 block">
            Select Historical Era
          </span>
          {historicalEras.map((era, idx) => {
            const isSelected = idx === activeEraIndex;
            return (
              <button
                key={era.id}
                onClick={() => setActiveEraIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-blau-600/30 to-grana-600/30 border-gold-500/50 shadow-xl'
                    : 'bg-card border-white/10 hover:border-white/20 text-muted-foreground hover:text-white'
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-gold-400 block">
                    {era.yearsSpan}
                  </span>
                  <span className="font-display text-base font-bold uppercase text-white block mt-0.5">
                    {era.title}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-gold-400 translate-x-1' : 'text-muted-foreground'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Selected Era Spotlight Narrative */}
        <div className="lg:col-span-8 flex flex-col">
          <Reveal key={activeEra.id} direction="right">
            <div className="h-full bg-card border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="gold" size="sm">
                    {activeEra.yearsSpan}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground uppercase">
                    CHAPTER {activeEraIndex + 1} OF {historicalEras.length}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white mb-3">
                  {activeEra.title}
                </h3>

                <p className="font-mono text-sm text-gold-400 mb-6 italic">
                  “{activeEra.tagline}”
                </p>

                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  {activeEra.narrative}
                </p>

                {/* Key Figures */}
                <div className="mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2 font-bold">
                    Key Protagonists
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeEra.keyFigures.map((fig) => (
                      <Badge key={fig} variant="default" size="sm">
                        {fig}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Major Trophies Won in Era */}
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2 font-bold">
                    Silverware Highlights
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeEra.majorTrophiesWon.map((trop) => (
                      <Badge key={trop} variant="blau" size="sm">
                        <Award className="w-3 h-3 inline mr-1 text-gold-400" />
                        {trop}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Footer if present */}
              {activeEra.iconicQuote && (
                <div className="mt-8 pt-6 border-t border-white/10 bg-white/[0.02] p-4 rounded-xl">
                  <p className="text-sm italic text-white font-medium">
                    &quot;{activeEra.iconicQuote.text}&quot;
                  </p>
                  <span className="font-mono text-xs text-gold-400 block mt-1">
                    — {activeEra.iconicQuote.author}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
