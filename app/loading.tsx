import React from 'react';
import { Shield } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden z-50">
      {/* Ambient background pulsing rings */}
      <div className="absolute w-96 h-96 rounded-full bg-blau-600/20 blur-[120px] animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full bg-grana-600/20 blur-[120px] animate-pulse delay-300" />

      <div className="relative flex flex-col items-center gap-6 text-center">
        {/* Animated Emblem */}
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-blau-600 via-grana-600 to-gold-500 p-0.5 animate-bounce duration-1000">
          <div className="w-full h-full bg-obsidian-950 rounded-[14px] flex items-center justify-center">
            <Shield className="w-10 h-10 text-gold-400 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-2xl font-black uppercase tracking-widest text-white">
            BARÇA
          </span>
          <span className="font-mono text-xs text-gold-400 tracking-widest uppercase animate-pulse">
            LOADING EXPERIENCE...
          </span>
        </div>

        {/* Minimal progress line */}
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-blau-500 via-gold-500 to-grana-500 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
