import { z } from 'zod';
import { PlayerSchema, PlayerSeasonStatsSchema } from './index';

export const VerifiedSeasonSchema = z.object({
  season: z.string().min(1),
  competition: z.string().min(1),
  sourceUrl: z.string().url(),
  verifiedAt: z.string().date(),
  values: PlayerSeasonStatsSchema.partial(),
});

export const SquadProfileSchema = PlayerSchema.pick({
  id: true, slug: true, name: true, displayName: true, number: true,
  position: true, nationality: true,
}).extend({
  bio: z.string().min(1),
  sourceUrl: z.string().url(),
  editorial: z.object({
    role: z.string(),
    headline: z.string(),
    description: z.string(),
    strengths: z.array(z.string()).min(1),
    responsibilities: z.array(z.string()).min(1),
    zone: z.enum(['goal', 'defence', 'right-defence', 'midfield', 'left', 'right', 'centre']),
    zoneLabel: z.string(),
  }),
  stats: VerifiedSeasonSchema.nullable(),
});

export type SquadProfile = z.infer<typeof SquadProfileSchema>;
export type VerifiedSeason = z.infer<typeof VerifiedSeasonSchema>;
