import { z } from 'zod';
import { TeamSchema } from '@/lib/schemas/matches';

const text = z.string().trim().min(1).max(200);
export const SeasonSchema = z.object({ id: z.string().min(1), startDate: z.string().date(), endDate: z.string().date() }).refine((season) => season.startDate <= season.endDate, 'Season dates must be ordered');
export const FootballPlayerSchema = z.object({ id: z.string().min(1), name: text, position: text.nullable(), nationality: text.nullable(), birthDate: z.string().date().nullable(), number: z.number().int().positive().nullable() });
export const FootballTeamSchema = TeamSchema.extend({ venue: text.nullable(), squad: z.array(FootballPlayerSchema).nullable(), retrievedAt: z.string().datetime(), updatedAt: z.string().datetime().nullable() }).refine((team) => !team.squad || new Set(team.squad.map((player) => player.id)).size === team.squad.length, 'Duplicate roster identifiers');
export const StandingSchema = z.object({
  position: z.number().int().positive(), team: TeamSchema, played: z.number().int().nonnegative(),
  won: z.number().int().nonnegative(), drawn: z.number().int().nonnegative(), lost: z.number().int().nonnegative(),
  points: z.number().int(), goalsFor: z.number().int().nonnegative(), goalsAgainst: z.number().int().nonnegative(), goalDifference: z.number().int(),
}).refine((row) => row.won + row.drawn + row.lost === row.played && row.goalsFor - row.goalsAgainst === row.goalDifference, 'Inconsistent standing totals');
export const CompetitionTableSchema = z.object({ competition: z.object({ id: z.string().min(1), name: text }), season: SeasonSchema, rows: z.array(StandingSchema), retrievedAt: z.string().datetime() })
  .refine((table) => new Set(table.rows.map((row) => row.team.id)).size === table.rows.length && new Set(table.rows.map((row) => row.position)).size === table.rows.length, 'Duplicate standing entries');
export type FootballTeam = z.infer<typeof FootballTeamSchema>;
export type FootballPlayer = z.infer<typeof FootballPlayerSchema>;
export type CompetitionTable = z.infer<typeof CompetitionTableSchema>;
