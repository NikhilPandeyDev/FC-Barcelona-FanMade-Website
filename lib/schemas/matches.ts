import { z } from 'zod';

const text = z.string().trim().min(1);
export const MatchSourceSchema = z.object({ title: text, url: z.string().url().startsWith('https://'), verifiedAt: z.string().date() });
export const TeamSchema = z.object({ id: text, name: text, shortName: text });
export const CompetitionSchema = z.object({ name: text, round: text, season: text });
const ScoreSchema = z.object({ home: z.number().int().nonnegative(), away: z.number().int().nonnegative() });
export const MatchEventSchema = z.object({
  id: text, minute: z.number().int().min(1).max(120), addedTime: z.number().int().nonnegative().optional(),
  type: z.enum(['GOAL', 'YELLOW_CARD', 'RED_CARD', 'SUBSTITUTION']), side: z.enum(['home', 'away']),
  player: text, assist: text.optional(), detail: text.optional(),
});
export const MatchStatSchema = z.object({
  id: text, label: text, unit: z.enum(['count', 'percent']), home: z.number().nonnegative(), away: z.number().nonnegative(),
}).refine((stat) => stat.unit !== 'percent' || (stat.home <= 100 && stat.away <= 100), 'Percentages must be within 0–100');
export const PlayerAppearanceSchema = z.object({
  number: z.number().int().positive(), name: text,
  position: text.optional(), x: z.number().min(0).max(100).optional(), y: z.number().min(0).max(100).optional(),
}).refine((player) => (player.x === undefined) === (player.y === undefined), 'Pitch coordinates require both axes');
export const LineupSchema = z.object({
  formation: text.nullable(), starters: z.array(PlayerAppearanceSchema).length(11),
  substitutes: z.array(PlayerAppearanceSchema).nullable(), source: MatchSourceSchema,
}).refine((lineup) => new Set(lineup.starters.map((player) => player.number)).size === 11, 'Starting shirt numbers must be unique');
export const MatchSchema = z.object({
  id: text, competition: CompetitionSchema, kickoff: z.string().datetime().nullable(), venue: text.nullable(),
  homeTeam: TeamSchema, awayTeam: TeamSchema, status: z.enum(['UPCOMING', 'FINISHED', 'POSTPONED', 'IN_PROGRESS', 'SUSPENDED', 'CANCELLED', 'AWARDED']),
  score: ScoreSchema.nullable(), halfTime: ScoreSchema.nullable(), source: MatchSourceSchema,
  dataKind: z.enum(['curated', 'provider']).default('curated'),
  retrievedAt: z.string().datetime().optional(), updatedAt: z.string().datetime().nullable().optional(),
  scoreDuration: z.enum(['REGULAR', 'EXTRA_TIME', 'PENALTY_SHOOTOUT']).optional(), penalties: ScoreSchema.nullable().optional(),
  events: z.object({ items: z.array(MatchEventSchema), source: MatchSourceSchema, coverage: text }).nullable(),
  stats: z.object({ items: z.array(MatchStatSchema), source: MatchSourceSchema }).nullable(),
  lineups: z.object({ home: LineupSchema.nullable(), away: LineupSchema.nullable() }).nullable(),
  editorial: z.object({ title: text, description: text }),
}).superRefine((match, context) => {
  if (match.status === 'FINISHED' && match.score === null) context.addIssue({ code: 'custom', path: ['score'], message: 'Finished matches require a final score' });
  if (['UPCOMING', 'POSTPONED', 'CANCELLED'].includes(match.status) && match.score !== null) context.addIssue({ code: 'custom', path: ['score'], message: 'Unplayed matches cannot have a score' });
  if (match.halfTime && (!match.score || match.halfTime.home > match.score.home || match.halfTime.away > match.score.away)) context.addIssue({ code: 'custom', path: ['halfTime'], message: 'Half-time score must not exceed full time' });
  if (match.homeTeam.id === match.awayTeam.id) context.addIssue({ code: 'custom', path: ['awayTeam'], message: 'Teams must differ' });
});

export type Match = z.infer<typeof MatchSchema>;
export type MatchSummary = Pick<Match, 'id' | 'competition' | 'kickoff' | 'homeTeam' | 'awayTeam' | 'status' | 'score'>;
export type Team = z.infer<typeof TeamSchema>;
export type MatchSource = z.infer<typeof MatchSourceSchema>;
export type Lineup = z.infer<typeof LineupSchema>;
