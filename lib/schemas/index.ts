import { z } from 'zod';

export const PlayerPositionSchema = z.enum(['Goalkeeper', 'Defender', 'Midfielder', 'Forward']);

export const PlayerRadarMetricSchema = z.object({
  label: z.string(),
  value: z.number().min(0).max(100),
});

export const PlayerSeasonStatsSchema = z.object({
  appearances: z.number().min(0),
  starts: z.number().min(0),
  minutesPlayed: z.number().min(0),
  goals: z.number().min(0),
  assists: z.number().min(0),
  cleanSheets: z.number().min(0).optional(),
  yellowCards: z.number().min(0),
  redCards: z.number().min(0),
  passAccuracyPct: z.number().min(0).max(100),
  dribblesSuccPct: z.number().min(0).max(100).optional(),
  tacklesWonPct: z.number().min(0).max(100).optional(),
  ratingAvg: z.number().min(0).max(10),
});

export const PlayerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  displayName: z.string(),
  number: z.number().int().min(1).max(99),
  position: PlayerPositionSchema,
  specificRole: z.string(),
  nationality: z.string(),
  flagCode: z.string(),
  birthDate: z.string(),
  birthPlace: z.string(),
  heightCm: z.number().positive(),
  weightKg: z.number().positive(),
  foot: z.enum(['Left', 'Right', 'Both']),
  isLaMasia: z.boolean(),
  isCaptain: z.boolean().optional(),
  captainRank: z.number().int().min(1).max(5).optional(),
  joinedYear: z.number().int(),
  contractUntil: z.number().int(),
  photoUrl: z.string(),
  actionPhotoUrl: z.string().optional(),
  bio: z.string(),
  statsSeason: PlayerSeasonStatsSchema,
  radarMetrics: z.array(PlayerRadarMetricSchema),
});

export const CompetitionSchema = z.enum([
  'La Liga',
  'UEFA Champions League',
  'Copa del Rey',
  'Supercopa de España',
]);

export const MatchStatusSchema = z.enum(['UPCOMING', 'LIVE', 'FINISHED', 'POSTPONED']);

export const MatchSchema = z.object({
  id: z.string(),
  competition: CompetitionSchema,
  competitionRound: z.string().optional(),
  season: z.string(),
  date: z.string(),
  venue: z.string(),
  isHome: z.boolean(),
  opponent: z.object({
    name: z.string(),
    shortName: z.string(),
    logoUrl: z.string(),
    city: z.string(),
  }),
  status: MatchStatusSchema,
  score: z
    .object({
      barca: z.number().int().min(0),
      opponent: z.number().int().min(0),
      halfTime: z
        .object({
          barca: z.number().int().min(0),
          opponent: z.number().int().min(0),
        })
        .optional(),
    })
    .optional(),
  events: z
    .array(
      z.object({
        minute: z.number().int().min(1),
        type: z.enum(['GOAL', 'ASSIST', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION', 'VAR']),
        player: z.string(),
        assistPlayer: z.string().optional(),
        team: z.enum(['BARCA', 'OPPONENT']),
        description: z.string().optional(),
      })
    )
    .optional(),
  stats: z
    .object({
      possession: z.tuple([z.number(), z.number()]),
      shotsTotal: z.tuple([z.number(), z.number()]),
      shotsOnTarget: z.tuple([z.number(), z.number()]),
      xg: z.tuple([z.number(), z.number()]),
      passes: z.tuple([z.number(), z.number()]),
      passAccuracy: z.tuple([z.number(), z.number()]),
      corners: z.tuple([z.number(), z.number()]),
      fouls: z.tuple([z.number(), z.number()]),
    })
    .optional(),
  broadcastInfo: z
    .object({
      spain: z.string().optional(),
      usa: z.string().optional(),
      uk: z.string().optional(),
      global: z.string().optional(),
    })
    .optional(),
});

export const TrophySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['DOMESTIC_LEAGUE', 'DOMESTIC_CUP', 'EUROPEAN', 'WORLD']),
  totalTitles: z.number().int().min(1),
  yearsWon: z.array(z.number().int()),
  featuredYear: z.number().int(),
  description: z.string(),
  iconName: z.string(),
  badgeAccent: z.string(),
});

export const HistoricalEraSchema = z.object({
  id: z.string(),
  title: z.string(),
  yearsSpan: z.string(),
  startYear: z.number().int(),
  endYear: z.number().int().optional(),
  tagline: z.string(),
  narrative: z.string(),
  keyFigures: z.array(z.string()),
  majorTrophiesWon: z.array(z.string()),
  bannerImage: z.string(),
  iconicQuote: z
    .object({
      text: z.string(),
      author: z.string(),
    })
    .optional(),
});

export const LegendSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  nickname: z.string().optional(),
  yearsActive: z.string(),
  position: z.string(),
  appearances: z.number().int(),
  goals: z.number().int(),
  trophiesCount: z.number().int(),
  photoUrl: z.string(),
  quote: z.string(),
  legacySummary: z.string(),
  iconicMoment: z.string(),
});
