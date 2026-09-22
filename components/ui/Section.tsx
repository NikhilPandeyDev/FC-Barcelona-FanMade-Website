import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  kicker?: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  containerSize?: 'default' | 'wide' | 'narrow' | 'editorial' | 'full';
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}

export function Section({
  id,
  kicker,
  title,
  subtitle,
  align = 'left',
  containerSize = 'default',
  headerRight,
  className,
  children,
  ...props
}: SectionProps) {
  const hasHeader = kicker || title || subtitle || headerRight;

  return (
    <section
      id={id}
      className={cn('relative py-16 sm:py-24 lg:py-28 overflow-hidden', className)}
      {...props}
    >
      <Container size={containerSize}>
        {hasHeader && (
          <div
            className={cn(
              'mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6',
              align === 'center' && 'text-center md:flex-col md:items-center'
            )}
          >
            <div className={cn(align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl')}>
              {kicker && (
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-gold-400 font-semibold">
                    {kicker}
                  </span>
                </div>
              )}
              {title && (
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white font-display">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
            {headerRight && <div className="flex-shrink-0">{headerRight}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
