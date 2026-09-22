# FC Barcelona Fan Experience — Technical Architecture

## 1. System Overview

The application is built on Next.js App Router (React 18/19), TypeScript, Tailwind CSS, and Motion for React. It is engineered with strict separation of concerns, high performance rendering, and clean abstraction for football data.

```
┌────────────────────────────────────────────────────────┐
│                   Next.js App Router                   │
│      (/, /squad, /matches, /history, /stadium, etc.)    │
└──────────────────────────┬─────────────────────────────┘
                           │
       ┌───────────────────┴───────────────────┐
       ▼                                       ▼
┌───────────────────────────┐       ┌───────────────────────────┐
│     Server Components     │       │     Client Components     │
│   (SEO, Static Data,      │       │  (Motion, Sound, Filters, │
│    Data Fetching, Layout) │       │   Interactive Pitch, UI)  │
└──────────────┬────────────┘       └─────────────┬─────────────┘
               │                                  │
               └──────────────────┬───────────────┘
                                  ▼
                 ┌────────────────────────────────┐
                 │       Component Library        │
                 │   /components/ui               │
                 │   /components/layout           │
                 │   /components/motion           │
                 │   /components/[feature]        │
                 └────────────────┬───────────────┘
                                  ▼
                 ┌────────────────────────────────┐
                 │      Data Layer & Services     │
                 │   /data (static/mock dataset)  │
                 │   /lib/api (fetchers & schema) │
                 │   /lib/schemas (Zod schemas)   │
                 └────────────────────────────────┘
```

---

## 2. Directory Structure

```
fc-barcelona/
├── app/                      # Next.js App Router pages, layouts, and loading boundaries
│   ├── layout.tsx            # Global layout (Header, Footer, Background ambience)
│   ├── page.tsx              # Cinematic Homepage narrative flow
│   ├── loading.tsx           # Global loading state
│   ├── error.tsx             # Global error boundary
│   ├── not-found.tsx         # 404 Custom page
│   └── globals.css           # Tailwind + Custom theme CSS & CSS variables
├── components/               # UI components
│   ├── ui/                   # Primitive tokens (Button, Badge, Card, Modal, etc.)
│   ├── layout/               # Header, Footer, MobileNav, Container, Section
│   ├── motion/               # Reveal, Magnetic, Parallax, StaggerContainer
│   ├── home/                 # Specific sections for homepage
│   ├── players/              # Player cards, radar charts, lineup viewer
│   ├── matches/              # Match fixtures, scoreboard, match center timeline
│   ├── history/              # Timeline slider, trophy viewer
│   └── stadium/              # Camp Nou interactive visualizer
├── data/                     # Local vetted football datasets
│   ├── players.ts            # First team squad data
│   ├── matches.ts            # Current season match fixtures & results
│   ├── trophies.ts           # Club trophy haul and milestones
│   ├── history.ts            # Historical eras and key moments
│   └── legends.ts            # Club legends biographies and stats
├── docs/                     # Project architectural and design documentation
│   ├── PRODUCT.md
│   ├── ARCHITECTURE.md
│   ├── DATA.md
│   ├── DESIGN.md
│   └── ANIMATION.md
├── lib/                      # Core helpers & utils
│   ├── schemas/              # Zod validation schemas
│   ├── motion.ts             # Motion variants & easing definitions
│   ├── utils.ts              # cn() class merger and general formatting utils
│   └── sound.ts              # Audio controller (optional ambient chants)
├── public/                   # Static assets (badges, textures, vector graphics)
├── tailwind.config.ts        # Extended Tailwind design tokens
├── tsconfig.json             # Strict TypeScript configuration
└── AGENTS.md                 # Agent instructions & standards
```

---

## 3. Server vs Client Component Strategy

1. **Default to Server Components**: All layout shells, data fetchers, static editorial narratives, and typography blocks execute on the server for zero client bundle bloat and instant First Contentful Paint.
2. **Client Components (`'use client'`) Boundary**:
   - Motion animated wrappers (`<Reveal>`, `<MagneticButton>`)
   - Interactive squad filters and search inputs
   - Interactive match timeline scrubber and audio toggle
   - Visual charts (Recharts canvas)
3. **Isolate Interactivity**: Client components should be leaf nodes whenever possible. Pass server-fetched data down via props.

---

## 4. Scalability for Real-Time Football APIs

The data layer is abstracted behind strongly typed repository functions:
- `getUpcomingMatches()`
- `getSquadPlayers()`
- `getPlayerBySlug(slug: string)`
- `getClubTrophies()`

Currently, these resolve from `/data/` with Zod validation. When integrating a third-party football API (e.g. Football-Data.org or API-Football):
1. Server functions in `/lib/api/` will fetch upstream endpoints.
2. Zod will validate the incoming payload against defined schemas.
3. Fallback gracefully to local curated data if an API is unavailable or rate-limited.
4. Component layer requires zero changes because the output interface remains strictly identical.
