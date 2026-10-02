# Football data QA — 2 October 2026

## Implementation review

Provider research/decision, domain contracts, endpoint scope, configuration, caching, freshness and fallback are documented in [DATA.md](DATA.md). The existing home, Match Center and editorial Squad UI remain; optional current data is added without overwriting historical profiles or match evidence.

Credentials stay in server-only modules and are read from environment variables. `.env*` is ignored, with only the empty `.env.example` allowed. Dynamic match IDs are bounded and must belong to the shared Barcelona feed before a detail request. Fixed HTTPS URLs, rejected redirects, bounded response sizes, timeouts, request coalescing and cooldowns protect the transport. User-facing errors no longer render raw error messages. No provider host, auth header or key variable occurs in generated client chunks.

## Automated verification

- `npm run typecheck`: passed.
- `npm run lint`: passed, no warnings/errors.
- `npm run build`: passed. Home 173 kB first-load JS; matches and squad 135 kB; detail 134 kB. Provider transport remains server-side; no new client data fetching/polling.
- `node scripts/check-football-data.cjs`: passed synthetic successful responses, all nine provider statuses, home/away score ordering, zeros/nulls, optional fields and long names, invalid JSON/schema, unavailable endpoints, missing key, empty feed, ID scoping, concurrent coalescing, eight-call gate, cooldowns, authentication/429/503/404 failures, timeouts and sanitized errors.
- `node scripts/check-matches.cjs`: passed domain/filter/source/score/lineup safeguards.
- `node scripts/check-squad-components.cjs`: passed model/filter/missing-statistics/reduced-motion/link behavior.
- Production HTTP route checks cover home, squad hub, all eight player profiles, matches hub, all three historical details, invalid routes, missing-key fallback and provider-shaped IDs without credentials. All passed against the final production build on port 3101, including HTTP 404 status checks.

The first route run caught a soft 404 after automatic loading started streaming. The inherited root and Match Center loading skeletons were moved into their respective home/hub Suspense boundaries; detail resolution can finish before headers are sent. Missing provider access gets an honest temporary-unavailability page; malformed/unknown IDs get not-found.

## Design and browser boundaries

Static strict audit `football-static-audit.json` reports the same two baseline false positives as the earlier Match Center audit: `Button href="/"` in error/not-found screens is recognized as an actionless button by the script, but the Button component renders a functioning Next Link. No new finding was introduced.

Computer Use was attempted, then stopped automatically because it could not verify the browser URL on Windows. No further UI automation was issued. Rendered browser, responsive widths, visual animation/loading behavior, console and full keyboard/accessibility QA are therefore outstanding. Source markup and component tests are evidence only; they do not substitute for rendered QA. Long-name wrapping and nullable values were reviewed in code and normalization tests, not claimed as browser-verified.

## External validation and security limits

No real provider account/key was supplied. Authenticated success is tested with injected synthetic fixtures only; actual free-plan payloads/entitlements must be verified after account activation. No fabricated provider data is shipped in production. Missing-key production routes use the explicitly labeled historical archive.

`npm audit` reports five existing dependency vulnerabilities (four high, one critical), including Next 14.2.35 and its tooling/transitive packages. The dependency diff only adds `server-only`; these findings predate this integration. npm proposes a major framework/tooling upgrade. A supported security upgrade and regression checks remain a public deployment blocker; no forced migration was performed as part of the data milestone.

The per-process gate does not coordinate multiple deployments sharing a key. Public multi-instance operation needs a shared quota gate. Free snapshots are delayed, detailed events/statistics/lineups and a current roster are not promised, historical provider access is limited, and displayed successful cached data may outlive its intended revalidation interval during provider failure.
