import 'server-only';
import { FootballDataError } from './errors';

const BASE_URL = 'https://api.football-data.org/v4/';
// Per-process protection; multi-instance deployment requires a shared gate.
export function createFootballClient(token: string, fetcher: typeof fetch = fetch, now = Date.now) {
  let requestTimes: number[] = [];
  let blockedUntil = 0;
  const pending = new Map<string, Promise<unknown>>();
  async function request(path: string): Promise<unknown> {
    requestTimes = requestTimes.filter((time) => now() - time < 60000);
    if (now() < blockedUntil || requestTimes.length >= 8) throw new FootballDataError('rate_limit');
    requestTimes.push(now());
    try {
      const response = await fetcher(new URL(path, BASE_URL), { headers: { 'X-Auth-Token': token, Accept: 'application/json' }, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(8000) });
      if (!response.ok) {
        if (response.status === 404) throw new FootballDataError('not_found');
        if (response.status === 401 || response.status === 403) { blockedUntil = now() + 300000; throw new FootballDataError('authentication'); }
        if (response.status === 429) {
          const retry = Number(response.headers.get('Retry-After') ?? response.headers.get('X-RequestCounter-Reset') ?? 60);
          blockedUntil = now() + (Number.isFinite(retry) ? Math.min(300, Math.max(60, retry)) : 60) * 1000;
          throw new FootballDataError('rate_limit');
        }
        blockedUntil = now() + 60000;
        throw new FootballDataError('unavailable');
      }
      if (!response.headers.get('content-type')?.includes('application/json')) throw new FootballDataError('invalid_data');
      if (Number(response.headers.get('content-length') ?? 0) > 1000000) throw new FootballDataError('invalid_data');
      const body = await response.text();
      if (body.length > 1000000) throw new FootballDataError('invalid_data');
      try { return JSON.parse(body) as unknown; } catch { throw new FootballDataError('invalid_data'); }
    } catch (error) {
      if (error instanceof FootballDataError) throw error;
      if (error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)) throw new FootballDataError('timeout');
      throw new FootballDataError('unavailable');
    }
  }
  return { get(path: string) {
    if (!/^(teams\/81(?:\/matches)?|matches\/[1-9]\d{0,9}|competitions\/PD\/standings)(?:\?[A-Za-z0-9=&%-]+)?$/.test(path)) throw new FootballDataError('configuration');
    const existing = pending.get(path);
    if (existing) return existing;
    const promise = request(path).finally(() => pending.delete(path));
    pending.set(path, promise);
    return promise;
  } };
}
