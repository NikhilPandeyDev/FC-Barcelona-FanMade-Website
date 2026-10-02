import type { FailureReason } from './types';
export class FootballDataError extends Error {
  constructor(public readonly reason: FailureReason) { super('Football data is unavailable.'); this.name = 'FootballDataError'; }
}
export const failureReason = (error: unknown): FailureReason => error instanceof FootballDataError ? error.reason : 'invalid_data';
