'use client';

import React from 'react';

export function GrainOverlay() {
  return (
    <>
      {/* Noise filter */}
      <div className="grain-layer" aria-hidden="true" />
      
      {/* Ambient background light glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Blau top-left atmospheric glow */}
        <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-blau-600/10 blur-[140px] pointer-events-none" />
        {/* Grana top-right atmospheric glow */}
        <div className="absolute top-[10%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-grana-600/10 blur-[150px] pointer-events-none" />
        {/* Deep gold subtle center accent */}
        <div className="absolute top-[60%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-gold-600/5 blur-[160px] pointer-events-none" />
      </div>
    </>
  );
}
