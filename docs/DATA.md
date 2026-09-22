# FC Barcelona Fan Experience — Data Architecture & Models

## 1. Data Integrity Principles

- **No Fictional Data**: Real players, real shirt numbers, verified trophy counts, and authentic match records.
- **Strict Typing with Zod**: Every data entity is defined as a Zod schema and exported as a TypeScript type.
- **Decoupled Repositories**: UI never accesses raw fetch endpoints directly; it imports from typed repository providers.

---

## 2. Core Schemas & Entity Definitions

### 2.1 Player Entity
```typescript
export interface Player {
  id: string;
  slug: string;
  name: string;
  displayName: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  specificRole: string; // e.g. "Right Winger / Inside Forward"
  nationality: string;
  flagCode: string; // ISO 3166-1 alpha-2
  birthDate: string; // ISO date
  birthPlace: string;
  heightCm: number;
  weightKg: number;
  foot: 'Left' | 'Right' | 'Both';
  isLaMasia: boolean;
  isCaptain?: boolean;
  captainRank?: 1 | 2 | 3 | 4 | 5;
  joinedYear: number;
  contractUntil: number;
  photoUrl: string;
  actionPhotoUrl?: string;
  jerseyCutoutUrl?: string;
  bio: string;
  statsSeason: {
    appearances: number;
    starts: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
    cleanSheets?: number;
    yellowCards: number;
    redCards: number;
    passAccuracyPct: number;
    dribblesSuccPct?: number;
    tacklesWonPct?: number;
    ratingAvg: number;
  };
  radarMetrics: {
    label: string;
    value: number; // 0 - 100
  }[];
}
```

### 2.2 Match Entity
```typescript
export interface Match {
  id: string;
  competition: 'La Liga' | 'UEFA Champions League' | 'Copa del Rey' | 'Supercopa de España';
  competitionRound?: string; // e.g., "Matchday 28" or "Quarter-Final Leg 1"
  season: string; // "2024/2025"
  date: string; // ISO UTC string
  venue: string; // "Estadi Olímpic Lluís Companys" | "Spotify Camp Nou" | Away venue
  isHome: boolean;
  opponent: {
    name: string;
    shortName: string;
    logoUrl: string;
    city: string;
  };
  status: 'UPCOMING' | 'LIVE' | 'FINISHED' | 'POSTPONED';
  score?: {
    barca: number;
    opponent: number;
    halfTime?: {
      barca: number;
      opponent: number;
    };
  };
  events?: {
    minute: number;
    type: 'GOAL' | 'ASSIST' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'VAR';
    player: string;
    assistPlayer?: string;
    team: 'BARCA' | 'OPPONENT';
    description?: string;
  }[];
  stats?: {
    possession: [number, number]; // [Barca, Opponent]
    shotsTotal: [number, number];
    shotsOnTarget: [number, number];
    xg: [number, number];
    passes: [number, number];
    passAccuracy: [number, number];
    corners: [number, number];
    fouls: [number, number];
  };
  broadcastInfo?: {
    spain: string;
    usa: string;
    uk: string;
    global: string;
  };
}
```

### 2.3 Trophy Entity
```typescript
export interface Trophy {
  id: string;
  name: string;
  category: 'DOMESTIC_LEAGUE' | 'DOMESTIC_CUP' | 'EUROPEAN' | 'WORLD';
  totalTitles: number;
  yearsWon: number[];
  featuredYear: number;
  description: string;
  iconName: string;
  badgeAccent: string;
}
```

### 2.4 Era & History Entity
```typescript
export interface HistoricalEra {
  id: string;
  title: string;
  yearsSpan: string;
  startYear: number;
  endYear?: number;
  tagline: string;
  narrative: string;
  keyFigures: string[];
  majorTrophiesWon: string[];
  bannerImage: string;
  iconicQuote?: {
    text: string;
    author: string;
  };
}
```

---

## 3. Data Flow & Mock Separation

All datasets reside in `/data/` as static TypeScript objects validated on import with Zod schemas. 
When testing or building:
1. `validateDataset(playersData, PlayerListSchema)` runs during development mode to detect schema deviations.
2. In production builds, zero runtime parse overhead occurs once statically evaluated.
