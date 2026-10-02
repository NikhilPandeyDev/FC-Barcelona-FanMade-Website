'use client';

import React from 'react';
import { ShieldAlert, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-grana-600/20 border border-grana-500/40 flex items-center justify-center mb-6 text-grana-400">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-grana-400 font-bold mb-2">
        Tactical Interruption
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-white mb-4">
        Something Went Offside
      </h1>
      <p className="text-muted-foreground text-sm max-w-md mb-8">
        We encountered an unexpected error loading this part of the stadium experience.
      </p>

      <div className="flex items-center gap-4">
        <Button
          onClick={() => reset()}
          variant="primary"
          leftIcon={<RotateCcw className="w-4 h-4" />}
        >
          Try Again
        </Button>
        <Button
          href="/"
          variant="secondary"
          leftIcon={<Home className="w-4 h-4" />}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
