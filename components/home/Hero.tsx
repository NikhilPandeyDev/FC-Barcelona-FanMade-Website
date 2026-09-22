'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Shield, Calendar } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Reveal } from '../motion/Reveal';

export function Hero() {
  return (
    <div className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Background Graphic Patterns */}
      <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />
      
      {/* Giant Decorative Ambient Number '1899' */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 font-display text-[22vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none">
        1899
      </div>

      <Container size="wide" className="relative z-10">
        <div className="max-w-4xl flex flex-col items-start gap-6">
          {/* Eyebrow / Kicker */}
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">
                THE DIGITAL CULÉ EXPERIENCE
              </span>
              <span className="text-white/20">|</span>
              <span className="font-mono text-xs text-muted-foreground uppercase">
                EST. 1899
              </span>
            </div>
          </Reveal>

          {/* Main Editorial Headline */}
          <Reveal direction="up" delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white font-display leading-[0.92]">
              MÉS QUE <br />
              <span className="text-gradient-blaugrana">UN CLUB.</span>
            </h1>
          </Reveal>

          {/* Subtitle / Narrative */}
          <Reveal direction="up" delay={0.35}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-normal leading-relaxed">
              Step inside the cinematic digital home of FC Barcelona. High-tempo pressing, tactical brilliance, La Masia prodigies, and 125 years of football art.
            </p>
          </Reveal>

          {/* Action CTAs */}
          <Reveal direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href="#squad"
                variant="primary"
                size="lg"
                isMagnetic
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore First Team
              </Button>

              <Button
                href="#matches"
                variant="secondary"
                size="lg"
                leftIcon={<Calendar className="w-4 h-4 text-gold-400" />}
              >
                Match Center
              </Button>
            </div>
          </Reveal>

          {/* Bottom Quick Feature Metrics */}
          <Reveal direction="up" delay={0.65}>
            <div className="pt-10 sm:pt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-white/[0.08] w-full mt-4">
              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  27
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                  La Liga Titles
                </span>
              </div>

              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-gold-400 tracking-tight">
                  5
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                  Champions Leagues
                </span>
              </div>

              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-blau-400 tracking-tight">
                  105k
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                  Camp Nou Capacity
                </span>
              </div>

              <div>
                <span className="block font-mono text-2xl sm:text-3xl font-bold text-grana-400 tracking-tight">
                  1899
                </span>
                <span className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                  Foundation Year
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
