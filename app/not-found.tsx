import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative">
      <div className="font-mono text-8xl sm:text-9xl font-black text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        404
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-bold mb-2">
        Out of Bounds
      </span>
      <h1 className="text-4xl sm:text-5xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
        Pitch Position Not Found
      </h1>
      <p className="text-muted-foreground text-base max-w-md mb-8">
        The page or player profile you are looking for has moved or does not exist in the squad registry.
      </p>

      <Button
        href="/"
        variant="gold"
        size="lg"
        leftIcon={<Home className="w-5 h-5" />}
      >
        Return to Camp Nou
      </Button>
    </div>
  );
}
