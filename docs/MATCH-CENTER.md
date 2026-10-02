# Cinematic Match Center

This milestone lives on `feature/match-center`, based on Squad commit `69e387c`.
It adds `/matches` and three statically generated `/matches/[id]` pages. Unknown
IDs use the shared 404. No API integration, credentials, polling or live scores.

## Experience

The hub introduces **the moment** with oversized editorial type and a featured
Bayern match. The scoreboard uses original typographic team marks, home/away
ordering, final and half-time scores, local kickoff time and venue. It deliberately
avoids using arbitrary photographs as official crests.

All / Upcoming / Results combine with a native competition selector. Competitions
come from the dataset. Changes announce the count, preserve filter focus, and
offer Reset filters. Upcoming is empty because this is a selected 2024/25 archive,
not the current schedule. Cards link to match stories. The homepage, header and
footer now lead into the Match Center.

Detail pages include section links, opposing-team goal timelines, comparison
bars, starting XIs, source links and explicit unavailable states. On small screens
the timeline becomes one column with a team label on every event. The card grid
steps from three to two to one columns. The starting XIs stack on mobile.

## Data boundary

`data/matches.ts` (existing match identities)
→ `data/match-evidence.ts` (verified historical fields and original editorial copy)
→ `lib/matches/adapter.ts` (normalization and Zod parsing)
→ `data/match-center.ts` (query helpers)
→ components.

`lib/schemas/matches.ts` defines Match, Team, Competition, MatchEvent, MatchStat,
PlayerAppearance, Lineup and source records. Scores use **home / away**, not
Barça / opponent. Nullable details distinguish unavailable data from zero. The
schema validates score/status consistency, half-time scores, percentages, unique
starting shirt numbers, eleven starters, paired coordinates, HTTPS sources and
verification dates. Source-specific data never reaches components.

A future server-side provider can validate and normalize into this contract.
The hub receives a small `MatchSummary` projection; timelines and lineups are not
serialized into its filter component. There is no runtime source fetching.

## Historical evidence

Verified on 23 September 2026, with the original three curated IDs retained:

| Match | Included | Sources |
| --- | --- | --- |
| Barcelona–Atalanta, 29 January 2025 | Final and half-time result; previous stale Upcoming label corrected | [UEFA full-time report](https://www.uefa.com/newsfiles/UCL/2025/2042070_FR.pdf) |
| Real Madrid–Barcelona, 26 October 2024 | Final and half-time result, all goal scorers/minutes | [Club report](https://www.fcbarcelona.com/en/news/4156771/real-madrid-0-4-fc-barcelona-viva-la-vida), [Players archive](https://players.fcbarcelona.com/en/match/f2445113-real-madrid-barcelona) |
| Barcelona–Bayern, 23 October 2024 | Result, all goals, six comparisons, both starting XIs | [UEFA result](https://www.uefa.com/newsfiles/UCL/2025/2041964_FR.pdf), [statistics](https://www.uefa.com/newsfiles/UCL/2025/2041964_TS.pdf), [lineups](https://www.uefa.com/newsfiles/UCL/2025/2041964_LU.pdf) |

Legacy unsourced xG, possession, shots and broadcast information were removed.
The Bayern totals use the report's full-time columns. No future fixtures were
invented. Dates are formatted explicitly in `Europe/Madrid`, including seasonal
offset changes. These are historical match facts, not current football data.

Atalanta events, the other matches' statistics and starting XIs, substitute
lists, and tactical coordinates are unavailable in this edition. UEFA's lineup
text confirms the starting players; screenshot tooling did not deliver its
formation diagram, so no formation or positional claims were inferred.
`TacticalPitch` accepts verified coordinates and includes a roster alternative;
without them it displays the honest unavailable explanation. Synthetic positions
exist only in the test script. Goal timelines explicitly omit cards/substitutions.

## Motion, access and performance

Existing Motion `Reveal` handles hero, featured scoreboard and timeline entrances.
Filters use short opacity/translation entrances with a capped per-card stagger.
Reduced motion removes translation and stagger, retaining only a short fade.

The Magic UI skill informed restrained reveal and border-emphasis patterns:
existing Motion supplies the reveal, and a CSS color border appears on card hover
or keyboard focus. These are adaptations, not installed Magic UI components.
No dependency was added. No counting scores, constant beams, particles, 3D,
scroll-jacking, GSAP or continuous animation was introduced.

Score, timeline, statistics and lineup components are server-rendered; only
filter state and existing Motion wrappers need client execution. No new raster
assets or image requests. The schema package stays outside the client graph
through type-only imports. Native links/buttons/select, visible global focus,
44px filter controls, status announcements, semantic lists and textual stat
values preserve access without relying on colors or effects.

## File inventory

Created:
- `app/matches/page.tsx`, `[id]/page.tsx`, `loading.tsx`, `error.tsx`
- `components/matches/FeaturedMatch.tsx`, `MatchScoreboard.tsx`, `MatchCard.tsx`
- `components/matches/MatchCollection.tsx`, `MatchFilters.tsx`, `MatchPrimitives.tsx`
- `components/matches/MatchTimeline.tsx`, `MatchStats.tsx`, `MatchLineups.tsx`
- `components/matches/matches.module.css`
- `data/match-center.ts`, `data/match-evidence.ts`
- `lib/schemas/matches.ts`, `lib/matches/adapter.ts`, `lib/matches/presentation.ts`
- `scripts/check-matches.cjs`, `scripts/check-match-routes.mjs`, `scripts/lib/load-typescript.cjs`
- this document, `MATCH-CENTER-QA.md`, `match-static-audit.json`

Modified: curated match identities, homepage Hero/MatchSpotlight, shared
Header/Footer, `docs/DESIGN.md`, `docs/DATA.md`, and `docs/ARCHITECTURE.md`.
Squad implementation and dependencies remain unchanged.
