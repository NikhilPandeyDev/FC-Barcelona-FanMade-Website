# Squad Experience

## Change inventory

Created:

- `app/squad/page.tsx`, `layout.tsx`, `squad.css`, `loading.tsx`, `error.tsx`,
  and `app/squad/[slug]/page.tsx`.
- `components/squad/SquadHero.tsx`, `SquadFilters.tsx`, `SquadGrid.tsx`,
  `PlayerCard.tsx`, `PlayerCardMedia.tsx`, `PlayerHeader.tsx`, `PlayerStats.tsx`,
  `TacticalRole.tsx`, and `PlayerNavigation.tsx`.
- `data/squad-editorial.ts`, `lib/schemas/squad.ts`,
  `scripts/check-squad.mjs`, `scripts/check-squad-components.cjs`,
  `docs/SQUAD-QA.md`, `docs/squad-static-audit.json`, and this document.

Modified: `data/players.ts`, `components/home/Hero.tsx`,
`components/home/SquadSpotlight.tsx`, `components/layout/Header.tsx`, and
`components/layout/Footer.tsx`, `components/motion/Reveal.tsx`,
`components/ui/Button.tsx`, `lib/motion.ts`, `app/layout.tsx`,
`app/globals.css`, and `docs/DESIGN.md`. No dependencies added or changed.

## Scope and provenance

`/squad` is a **curated eight-player 2024/25 archive**, not a complete or current
roster. The edition is disclosed on the hub and every profile. The existing
shirt numbers are consistent with the club's 2024/25 announcement:
https://www.fcbarcelona.com/en/football/first-team/news/4106426/202425fc/featured

`data/players.ts` remains the identity source and exposes `getSquadPlayers()` and
`getPlayerBySlug()`. `data/squad-editorial.ts` holds original tactical commentary
and short biographies with official club source URLs. Commentary, strengths and
role zones are explicitly labelled as editorial interpretation, not measured
attributes. The diagram is not a heatmap.

The legacy homepage's numeric season totals and radar ratings have no source,
competition or season scope. The new Zod-validated `SquadProfile` strips those
fields and publishes `stats: null`. Existing homepage content is retained, not
silently re-certified. Audit those legacy totals separately before publication.

`VerifiedSeasonSchema` requires season, competition, source URL and verification
date. Individual metrics are optional; missing data is omitted and zero is a
valid value. `PlayerStats` supports all existing season metric fields and an
unavailable state. No fabricated chart/demo ratings are introduced. Recharts is
already installed, but is not loaded because there is no validated chart dataset.

## Presentation and navigation

- Hub: SquadHero, SquadFilters, SquadGrid, PlayerCard, PlayerCardMedia.
- Detail: PlayerHeader, TacticalRole, PlayerStats, PlayerNavigation.
- Both use the existing Container, Reveal, typography, colors and Motion easing.
- Original CSS number artwork substitutes for missing licensed portraits.
- All eight profiles are statically generated with individual metadata.
- Invalid slugs use the global not-found page; squad loading/error boundaries
  provide waiting and recovery states.
- Navigation wraps in collection order. Route changes remount the player header
  entrance without delayed navigation or an additional transition framework.
- Homepage changes are limited to two links; header and footer link to the hub.
- The shared header now exposes its menu at tablet widths, supports Escape and
  return focus, and respects reduced motion for menu/nav transitions.

## Accessibility and responsive design

Filters are native toggle buttons (`aria-pressed`), wrap on narrow screens,
retain keyboard focus, and announce result counts. Each card is one labelled
link. Artwork is decorative; its information is available as text. Pitch diagrams
have explanatory captions. Focus rings are explicit on squad controls.

Cards use one/two/three/four columns at mobile/tablet/desktop/wide widths.
Player headers put identity before artwork on mobile. Navigation stacks on
small screens. Motion uses transform/opacity for filtering, a masked heading
entrance and an interaction-only card light sweep. Reduced motion disables
movement, masking, light sweeps and stagger. See `docs/SQUAD-QA.md` for the
refinement findings and exact verification limits.

## Validation

Commands:

```text
npm run typecheck
npm run lint
npm run build
npm run start -- --port 3100
node scripts/check-squad.mjs http://localhost:3100
node scripts/check-squad-components.cjs
git diff --check
```

The smoke script checks hub links, every profile, metadata, heading count,
editorial/data disclosures, navigation markup, exclusion of unverified metrics,
and a real HTTP 404 for an invalid slug.

Final results: typecheck, lint, production build and HTTP smoke checks pass.
The build generates the hub plus all eight profiles. `git diff --check` passes
with only Git's existing Windows line-ending notices. The smoke check initially
caught a streamed 200 for missing slugs; `dynamicParams = false` fixes that for
this closed archive, and the final run confirms HTTP 404.

Browser tooling reported no available browsers during implementation. Desktop,
tablet and mobile layouts, keyboard interaction, reduced-motion behavior, console
errors and animation smoothness still need a rendered browser pass. Loading,
error and empty states were implemented and reviewed in code, not fault-injected
in a browser.

Next milestone: complete the rendered browser QA matrix when browser tooling
is available, before expanding product scope.
