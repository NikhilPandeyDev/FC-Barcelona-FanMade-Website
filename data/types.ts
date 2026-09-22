import { z } from 'zod';
import {
  PlayerSchema,
  MatchSchema,
  TrophySchema,
  HistoricalEraSchema,
  LegendSchema,
  PlayerPositionSchema,
  CompetitionSchema,
} from '@/lib/schemas';

export type Player = z.infer<typeof PlayerSchema>;
export type PlayerPosition = z.infer<typeof PlayerPositionSchema>;
export type Match = z.infer<typeof MatchSchema>;
export type Competition = z.infer<typeof CompetitionSchema>;
export type Trophy = z.infer<typeof TrophySchema>;
export type HistoricalEra = z.infer<typeof HistoricalEraSchema>;
export type Legend = z.infer<typeof LegendSchema>;

export interface StadiumInfo {
  name: string;
  historicName: string;
  inaugurationYear: number;
  originalCapacity: number;
  newCapacity: number;
  status: string;
  expectedFullOpening: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  architecturalHighlights: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}
