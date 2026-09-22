import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'blau' | 'grana' | 'outline' | 'success' | 'live';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-obsidian-800 text-foreground border border-white/10',
    gold: 'bg-gold-500/10 text-gold-300 border border-gold-500/30',
    blau: 'bg-blau-500/20 text-blau-200 border border-blau-500/40',
    grana: 'bg-grana-500/20 text-grana-200 border border-grana-500/40',
    outline: 'bg-transparent text-muted-foreground border border-white/15',
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    live: 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono uppercase font-semibold transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {variant === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
      )}
      {children}
    </span>
  );
}
