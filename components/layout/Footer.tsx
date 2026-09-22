import React from 'react';
import Link from 'next/link';
import { Shield, ArrowUpRight, Heart } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';

export function Footer() {
  return (
    <footer className="relative bg-obsidian-950 border-t border-white/[0.08] pt-20 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-blau-950/40 via-grana-950/20 to-transparent blur-[120px] pointer-events-none" />

      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand & Manifesto */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blau-600 to-grana-600 p-0.5">
                <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-4 h-4 text-gold-400" />
                </div>
              </div>
              <span className="font-display text-xl font-black uppercase tracking-tight text-white">
                CULÉ EXPERIENCE
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              An independent, digital cinematic platform dedicated to the beauty of positional football, La Masia prodigies, and the enduring heritage of FC Barcelona.
            </p>

            <div className="flex items-center gap-2">
              <Badge variant="gold" size="sm">
                125+ YEARS OF HERITAGE
              </Badge>
              <Badge variant="outline" size="sm">
                FAN-MADE EXPERIENCE
              </Badge>
            </div>
          </div>

          {/* Chapters */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Chapters
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/#squad" className="hover:text-white transition-colors">
                  First Team Squad
                </Link>
              </li>
              <li>
                <Link href="/#matches" className="hover:text-white transition-colors">
                  Fixtures & Results
                </Link>
              </li>
              <li>
                <Link href="/#stats" className="hover:text-white transition-colors">
                  Tactical Intelligence
                </Link>
              </li>
              <li>
                <Link href="/#history" className="hover:text-white transition-colors">
                  Eras & Timeline
                </Link>
              </li>
              <li>
                <Link href="/#stadium" className="hover:text-white transition-colors">
                  Spotify Camp Nou
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage & Values */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-white font-semibold">
              Values & Legacy
            </span>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/#history" className="hover:text-white transition-colors">
                  Johan Cruyff Philosophy
                </Link>
              </li>
              <li>
                <Link href="/#history" className="hover:text-white transition-colors">
                  La Masia Academy
                </Link>
              </li>
              <li>
                <Link href="/#history" className="hover:text-white transition-colors">
                  Trophy Cabinet
                </Link>
              </li>
              <li>
                <Link href="/#fanzone" className="hover:text-white transition-colors">
                  Cant del Barça Anthem
                </Link>
              </li>
            </ul>
          </div>

          {/* Club Ethos Callout */}
          <div className="flex flex-col gap-3 bg-card p-5 rounded-2xl border border-white/[0.08]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-gold-400 font-bold">
              Club Motto
            </span>
            <p className="font-display text-lg font-bold text-white uppercase italic">
              “Més que un club”
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              More than a club — a symbol of identity, democracy, and football as an artistic expression.
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Culé Experience. Unofficial fan-created tribute. Not affiliated with or endorsed by FC Barcelona.
          </p>

          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-grana-500 fill-grana-500 inline" />
            <span>for Culés worldwide</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
