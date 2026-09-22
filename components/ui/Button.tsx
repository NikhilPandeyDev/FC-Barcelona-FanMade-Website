'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Magnetic } from '../motion/Magnetic';

interface ButtonStyleProps {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isMagnetic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

type ButtonProps = ButtonStyleProps & (
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  isMagnetic = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      'bg-white text-black font-semibold hover:bg-neutral-200 shadow-lg shadow-blau-950/50 border border-white/20 active:scale-[0.98]',
    secondary:
      'bg-obsidian-850/80 text-white font-medium hover:bg-obsidian-800 border border-white/10 hover:border-white/25 active:scale-[0.98]',
    gold:
      'bg-gold-500 text-black font-bold hover:bg-gold-400 shadow-lg shadow-gold-950/40 border border-gold-300/30 active:scale-[0.98]',
    ghost:
      'bg-transparent text-muted-foreground hover:text-white hover:bg-white/5 active:scale-[0.98]',
    outline:
      'bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5 active:scale-[0.98]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-full gap-2',
    lg: 'text-base px-7 py-3 rounded-full gap-2.5 font-semibold',
    xl: 'text-lg px-9 py-4 rounded-full gap-3 font-bold',
  };

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2">
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="flex-shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">{rightIcon}</span>}
    </span>
  );

  const buttonElement = href ? (
    <Link
      href={href}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      className={cn(
        'group relative inline-flex items-center justify-center transition-all duration-200 select-none overflow-hidden cursor-pointer motion-reduce:transform-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {content}
    </Link>
  ) : (
    <button
      type="button"
      className={cn(
        'group relative inline-flex items-center justify-center transition-all duration-200 select-none overflow-hidden cursor-pointer motion-reduce:transform-none disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );

  if (isMagnetic) {
    return <Magnetic>{buttonElement}</Magnetic>;
  }

  return buttonElement;
}
