'use client';

import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { Music, Heart, Volume2, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';

export function FanZoneTeaser() {
  const [activeTab, setActiveTab] = useState<'catalan' | 'english'>('catalan');

  return (
    <Section
      id="fanzone"
      kicker="CULÉ PASSION & CULTURE"
      title="Cant del Barça"
      subtitle="The anthem that unites millions across continents under one Blaugrana heart."
      containerSize="wide"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Anthem Interactive Box */}
        <div className="lg:col-span-7 flex flex-col">
          <Reveal direction="left">
            <div className="h-full bg-card border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-gold-400" />
                    <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-bold">
                      Official Club Anthem
                    </span>
                  </div>

                  {/* Language switch */}
                  <div className="flex items-center bg-obsidian-900 rounded-full p-1 border border-white/10 font-mono text-xs">
                    <button
                      onClick={() => setActiveTab('catalan')}
                      className={`px-3 py-1 rounded-full uppercase transition-colors ${
                        activeTab === 'catalan'
                          ? 'bg-gold-500 text-black font-bold'
                          : 'text-muted-foreground hover:text-white'
                      }`}
                    >
                      Català
                    </button>
                    <button
                      onClick={() => setActiveTab('english')}
                      className={`px-3 py-1 rounded-full uppercase transition-colors ${
                        activeTab === 'english'
                          ? 'bg-gold-500 text-black font-bold'
                          : 'text-muted-foreground hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Lyrics Display */}
                {activeTab === 'catalan' ? (
                  <div className="space-y-4 font-display text-lg sm:text-xl text-white font-bold tracking-tight">
                    <p>Tot el camp és un clam,</p>
                    <p>som la gent blaugrana,</p>
                    <p>Tant se val d’on venim,</p>
                    <p>si del sud o del nord,</p>
                    <p className="text-gold-400">ara estem d’acord, estem d’acord,</p>
                    <p className="text-2xl sm:text-3xl text-gradient-blaugrana font-black uppercase">
                      una bandera ens agermana: <br />
                      Barça! Barça! Baaarça!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 font-display text-lg sm:text-xl text-white font-bold tracking-tight">
                    <p>The whole stadium roars with one cry,</p>
                    <p>We are the Blaugrana people,</p>
                    <p>It doesn&apos;t matter where we come from,</p>
                    <p>Whether south or north,</p>
                    <p className="text-gold-400">Now we agree, we all agree,</p>
                    <p className="text-2xl sm:text-3xl text-gradient-blaugrana font-black uppercase">
                      One flag unites us all: <br />
                      Barça! Barça! Baaarça!
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Composed by Josep Maria Espinàs & Jaume Picas (1974)</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Fan Community Callout */}
        <div className="lg:col-span-5 flex flex-col">
          <Reveal direction="right" delay={0.15}>
            <div className="h-full bg-gradient-to-br from-card to-obsidian-950 border border-white/10 rounded-3xl p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <Badge variant="gold" size="sm" className="mb-4">
                  GLOBAL CULÉ NETWORK
                </Badge>

                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mb-4">
                  Connect With Fellow Culés
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Join discussions on Hansi Flick’s tactical shapes, debate all-time player rankings, participate in match predictions, and download high-res wallpapers.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>Matchday Player Ratings & MOTM Voting</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <MessageSquare className="w-4 h-4 text-blau-400 flex-shrink-0" />
                    <span>Tactical Debates & La Masia Watch</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <Heart className="w-4 h-4 text-grana-400 flex-shrink-0" />
                    <span>Penyes Worldwide Directory & Match Screenings</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  variant="gold"
                  size="md"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Join Fan Zone
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
