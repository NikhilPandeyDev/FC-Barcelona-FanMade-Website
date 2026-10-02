'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Shield, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'Squad', href: '/squad' },
  { name: 'Matches', href: '/matches' },
  { name: 'Tactics & Stats', href: '/#stats' },
  { name: 'Heritage', href: '/#history' },
  { name: 'Camp Nou', href: '/#stadium' },
  { name: 'Fan Zone', href: '/#fanzone' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMobileMenuOpen(false);
      }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-obsidian-950/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60'
          : 'py-5 bg-transparent'
      )}
    >
      <Container size="wide">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Brand Logo & Identity */}
          <Link href="/" className="group flex items-center gap-3.5 select-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blau-600 to-grana-600 p-0.5 shadow-lg shadow-blau-950/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Shield className="w-5 h-5 text-gold-400 group-hover:rotate-6 transition-transform" />
                {/* Catalan Senyera stripes top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-grana-600 to-gold-500" />
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-lg font-black tracking-tight uppercase text-white group-hover:text-gold-400 transition-colors">
                CULÉ EXPERIENCE
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase -mt-0.5">
                EST. 1899 • BARCELONA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-obsidian-850/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/[0.08]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-full font-mono',
                    isActive
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-white'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Header Actions */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Curated match archive */}
            <Link href="/matches" className="hidden 2xl:block">
              <Badge variant="blau" size="sm" className="hover:bg-blau-500/30 cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                MATCH CENTER
              </Badge>
            </Link>

            {/* Ambient Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-obsidian-850/80 hover:bg-obsidian-800 border border-white/10 text-muted-foreground hover:text-white transition-colors"
              title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
              aria-label="Toggle Sound"
              aria-pressed={soundEnabled}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-gold-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Fan Zone CTA Button */}
            <Button
              href="/#fanzone"
              variant="primary"
              size="sm"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Join Culés
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex shrink-0 xl:hidden items-center gap-1">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-obsidian-850 border border-white/10 text-muted-foreground"
              aria-label="Toggle Sound"
              aria-pressed={soundEnabled}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-gold-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              ref={menuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-obsidian-850 border border-white/10 text-white"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            id="mobile-navigation"
            className="xl:hidden absolute top-full left-0 right-0 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-obsidian-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <div className="font-mono text-xs uppercase text-gold-400 tracking-widest pb-2 border-b border-white/10">
                Menu Navigation
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? 'page' : undefined}
                  className="flex min-h-11 items-center text-lg font-bold uppercase tracking-tight text-foreground hover:text-gold-400 py-1 font-display"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Button
                  href="/#fanzone"
                  variant="gold"
                  size="md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Enter Fan Community
                </Button>
                <p className="text-[11px] text-muted-foreground text-center">
                  Unofficial FC Barcelona Fan Experience
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
