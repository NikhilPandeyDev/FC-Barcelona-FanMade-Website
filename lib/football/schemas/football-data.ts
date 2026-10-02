import { z } from 'zod';

const text = z.string().trim().min(1).max(200);
const id = z.number().int().positive().max(Number.MAX_SAFE_INTEGER);
const nullableText = text.nullable().optional();
export const ProviderTeamSchema = z.object({ id, name: text, shortName: nullableText, tla: nullableText });
const pair = z.object({ home: z.number().int().nonnegative().nullable(), away: z.number().int().nonnegative().nullable() });
const player = z.object({ id, name: text, position: nullableText, nationality: nullableText, dateOfBirth: z.string().date().nullable().optional(), shirtNumber: z.number().int().positive().nullable().optional() });
const matchTeam = ProviderTeamSchema.extend({ lineup: z.array(player).optional(), bench: z.array(player).optional(), formation: nullableText });
const season = z.object({ id, startDate: z.string().date(), endDate: z.string().date() });
export const ProviderMatchSchema = z.object({
  id, utcDate: z.string().datetime(), status: z.enum(['SCHEDULED', 'TIMED', 'IN_PLAY', 'PAUSED', 'FINISHED', 'SUSPENDED', 'POSTPONED', 'CANCELLED', 'AWARDED']),
  competition: z.object({ id, code: text, name: text }), season,
  homeTeam: matchTeam, awayTeam: matchTeam, venue: nullableText,
  matchday: z.number().int().positive().nullable().optional(), stage: nullableText,
  lastUpdated: z.string().datetime().nullable().optional(),
  score: z.object({ fullTime: pair, halfTime: pair.optional(), duration: z.enum(['REGULAR', 'EXTRA_TIME', 'PENALTY_SHOOTOUT']).optional(), penalties: pair.optional() }),
});
export const ProviderFixturesSchema = z.object({ matches: z.array(ProviderMatchSchema).max(200) });
export const ProviderClubSchema = ProviderTeamSchema.extend({ venue: nullableText, squad: z.array(player).max(200).optional(), lastUpdated: z.string().datetime().nullable().optional() });
const standing = z.object({ position: z.number().int().positive(), team: ProviderTeamSchema, playedGames: z.number().int().nonnegative(), won: z.number().int().nonnegative(), draw: z.number().int().nonnegative(), lost: z.number().int().nonnegative(), points: z.number().int(), goalsFor: z.number().int().nonnegative(), goalsAgainst: z.number().int().nonnegative(), goalDifference: z.number().int() });
export const ProviderStandingsSchema = z.object({ competition: z.object({ id, code: text, name: text }), season, standings: z.array(z.object({ type: z.enum(['TOTAL', 'HOME', 'AWAY']), table: z.array(standing).max(50) })) });
