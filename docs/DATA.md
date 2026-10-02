# Football data foundation

Research and implementation date: 2 October 2026. Budget: free tier only; no provider account or credentials supplied. The schema files, rather than earlier illustrative interfaces, are the canonical contracts.

## Provider decision

Select **football-data.org v4 Free** for Barcelona (team ID 81), La Liga (`PD`) and Champions League (`CL`). This plan supplies fixtures, delayed results and standings at 10 authenticated requests/minute. Detailed squads, lineups, goals/cards, player statistics and team statistics are outside the selected free entitlement. Optional roster fields are normalized only when legitimately returned; absence is expected. This is a periodic snapshot integration, not a live-score service.

| Provider | Coverage and data | Free/pricing constraints | Assessment |
| --- | --- | --- | --- |
| football-data.org | Barcelona, La Liga and Champions League in free coverage; fixtures, results, standings. Rich events, lineups and player/team stats require higher plans/add-ons. Historical access depends on entitlement. | Free: 10 calls/minute and delayed scores. Deep Data is listed at €29/month; statistics add-on at €15/month. Header authentication. | Best fit for the requested free foundation and existing curated deep match experiences. Basic official v4 documentation is clear, though older examples and paid-limit descriptions should defer to current pricing. |
| API-Football / API-Sports | Barcelona, La Liga, Champions League; fixtures/results, events, lineups, squads, standings, player/team stats and live data where competition/season coverage permits. Coverage is granular, not a promise that every fixture has every field. | Free: 100 requests/day with restricted available seasons. Paid Pro listed at $19/month. `x-apisports-key` authentication. | Richer endpoints, but current-season entitlement and the small daily allowance weaken a free-only public application. Documentation and coverage flags are extensive. Historical/free-season access must be verified in an account. |
| Sportmonks | Broad paid football coverage including target competitions, historical and live data, lineups, events, squads, player/team statistics and standings depending on subscription/includes. | Free coverage is Danish Superliga and Scottish Premiership, not the target leagues. Starter listed at €29/month, five leagues, 2,000 calls/entity/hour, 14-day trial. Historical archive access can cost extra. Token authentication. | Detailed documentation and deep data, but a trial is not a sustainable free Barcelona entitlement. |

Official sources: [football-data pricing](https://www.football-data.org/pricing), [coverage](https://www.football-data.org/coverage), [registration and terms](https://www.football-data.org/client/register), [v4 documentation](https://docs.football-data.org/general/v4/index.html), [policies](https://docs.football-data.org/general/v4/policies.html), [team](https://docs.football-data.org/general/v4/team.html), [match](https://docs.football-data.org/general/v4/match.html), [competition](https://docs.football-data.org/general/v4/competition.html), [API-Football pricing](https://www.api-football.com/pricing/), [coverage](https://www.api-football.com/coverage), [terms](https://www.api-football.com/terms), [documentation](https://www.api-football.com/documentation-v3), [Sportmonks pricing](https://www.sportmonks.com/football-api/plans-pricing/), [free offering](https://www.sportmonks.com/).

Reliability is not established by an endpoint list. No production uptime or accuracy has been independently measured and no free service SLA is assumed. The adapter rejects inconsistent records and the product retains a usable archive.

Football-data terms require confidential credentials, fair use, one application/domain per key and visible attribution. Provider-backed sections render the required attribution. Logos/photos have separate rights; no provider crest or photograph is imported. This unofficial fan project must remain within the account's coverage and usage permissions, and remove API-derived references/data if service terms require it after cancellation. Other providers' access and redistribution terms require account-specific review before adopting them; this project does not use them.

## Architecture and models

`client.ts` → provider JSON schemas → `adapters/football-data.ts` → canonical domain schemas → `provider.ts` → `service.ts` → `server.ts` → existing React components.

`FootballProvider` implements only team (including optional roster), fixtures, match and standings. No unsupported player-statistics endpoint or hypothetical provider framework is introduced. Transport and provider factories accept injected fetch/time functions for deterministic tests.

`lib/schemas/matches.ts` remains the Match, Team, Competition, MatchEvent, MatchStats and Lineup contract used by Match Center. Provider normalization adds snapshot provenance and maps all nine provider statuses into canonical statuses. Scores preserve home/away order and zero values. Unsupported events/stats/lineups remain null. No player appearances or synthetic statistics are invented. `lib/football/schemas/domain.ts` adds Player, Season, Standing and CompetitionTable. Runtime Zod checks validate identifiers, dates, names, scores, optional roster fields, table totals and duplicates. Unknown optional JSON properties are discarded; incompatible required fields cause fallback.

The old domain sketches in this document are superseded by these source schemas. Editorial squad profiles and source-verified historical match details remain in their existing repositories; they are not overwritten by API records.

## Endpoints and configuration

The fixed HTTPS host is `https://api.football-data.org/v4/`:

- `teams/81`: club metadata and optional season roster.
- `teams/81/matches`: Barcelona fixtures/results, La Liga and Champions League, rolling 90 days back and 90 days ahead, maximum 200 records. This is not a complete historical archive.
- `matches/{id}`: only a validated ID present in the shared Barcelona feed.
- `competitions/PD/standings`: total La Liga table; no Champions League table is fabricated.

Register for a free key through the official website. Copy `.env.example` to `.env.local` locally and configure `FOOTBALL_DATA_API_KEY` there or in the deployment secret store. Leave it empty for archive fallback. `FOOTBALL_DATA_MODE=auto` enables provider use; `curated` explicitly disables network access. Invalid configuration also falls back. Restart after changing environment variables. Never paste keys into chat, documentation or Git.

`server-only` protects credential-bearing modules. No `NEXT_PUBLIC` key, browser fetch or configurable external base URL exists. Allowed paths and dynamic IDs are bounded. Redirects are rejected, requests time out after eight seconds, and response size/JSON/schema checks reject invalid data. Errors are sanitized; neither provider bodies nor keys are logged or shown. `.env*` is ignored except the empty `.env.example`.

## Caching, limits and freshness

| Category | Successful normalized result cache | Meaning |
| --- | --- | --- |
| Fixtures/recent results | 15 minutes | Delayed provider snapshot; no polling |
| Match detail | 15 minutes | Snapshot, not live events |
| La Liga standings | 1 hour | Periodic table |
| Team/optional season roster | 24 hours | May include players who appeared earlier this season |
| Curated editorial/archive | Local versioned records | Explicit 2024/25 edition, no API request |

Next `unstable_cache` persists successful normalized data; React `cache` deduplicates accesses within a render. Credential digests isolate cache identities without persisting the token as a cache argument. Transport fetch uses `no-store` so raw authenticated responses are not separately cached. Retrieval timestamps remain attached to data, so cached results do not acquire a false new retrieval time. Next may serve an older successful snapshot while revalidating; the UI displays retrieval time and never promises a hard freshness deadline or live status. An empty successful feed remains empty, rather than silently becoming archive data.

Concurrent identical transport calls coalesce. A per-process rolling gate allows eight calls/minute, reserving margin below the provider's ten-call limit. HTTP 429 honors a bounded cooldown (60–300 seconds); authentication failure waits five minutes and server errors one minute. No automatic retries or client request storms. This gate is process-local: multiple server instances or other applications sharing a key require a shared rate limiter before public scale. Data caching reduces usage but cannot guarantee an account-wide quota.

## Integration and fallback

Home Match Spotlight and Match Center use the shared fixture result. Provider fixture cards/details consume the same Match model and retain the established design and filters. Current standings are an optional disclosure. Historical detail links remain available separately.

Missing credentials, timeout, invalid JSON/schema, rate limit or provider failure return a visibly labeled curated 2024/25 archive for the fixture collection. Current standings and roster become honestly unavailable rather than invented. Editorial Squad remains intact; optional season roster appears separately without fabricated biographies or links to unknown player profiles.

Malformed IDs and IDs outside an available Barcelona feed use the site's not-found pattern. If the provider cannot establish whether an otherwise valid ID exists, the detail page shows temporary unavailability. If details fail but the validated fixture summary exists, that summary remains available with a limitation notice. Existing historical IDs never require the API.

## Verification and remaining limits

See [FOOTBALL-DATA-QA.md](FOOTBALL-DATA-QA.md) for commands/results and review boundaries. Success and failure behavior use injected synthetic provider responses; these are test fixtures only and never production fallback. No real authenticated provider success can be claimed without a user account/key. Verify the exact free account payload, competition/date filters and entitlements after activation. Free deep match data and current roster may remain unavailable permanently; the architecture preserves that distinction.

The team endpoint uses only documented date/limit filters; the adapter filters the validated response to PD and CL locally. API-Football's terms do not grant publication rights and require users to obtain any necessary third-party permissions. Sportmonks' [terms](https://www.sportmonks.com/terms-of-service/) allow building applications but prohibit unauthorized resale, restrict account sharing/domain usage and separately reserve image rights; its card-backed trial renews into paid service unless canceled. Neither alternative guarantees complete, accurate or continuously available data.
