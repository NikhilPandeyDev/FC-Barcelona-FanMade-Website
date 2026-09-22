# Squad milestone QA and refinement

## Scope

The collection remains the eight-player **2024/25 curated archive**. No current
squad information, numerical statistics or biographical claims were added in
this pass. No major feature or dependency was added. Full milestone file and
component inventory: [SQUAD.md](./SQUAD.md).

## Verified findings and fixes

- Filtering no longer waits for the outgoing collection to fade away. Results
  and count update together; retained cards animate their position. Stagger is
  capped at 105 ms. The result area has a one-row minimum, not a blank full-roster
  placeholder. The document naturally changes height with the result count.
- Card and profile numbers now scale from their containing artwork. Player names
  scale within their column; long names retain a wrap fallback. Equal grid rows,
  flexible card copy and bottom-aligned profile links improve alignment.
- Filter targets are at least 44 px wide and 48 px high. The count handles one
  profile and is an atomic live region. Each card remains one semantic link.
- Shared Reveal removes stagger, translation, scale and clipping in reduced
  motion, and explicitly resets old transforms when the preference changes.
  Ordinary reveals do not clip keyboard focus rings.
- Shared Button previously discarded link callbacks. Link props now reach the
  anchor, including the mobile-menu close handler; the unsafe `any` spread was
  removed. Native buttons retain pressed feedback without a separate Motion node.
- Shared navigation has 44 px mobile controls, smaller narrow-screen branding,
  active-route semantics, Escape/focus-leave dismissal and bounded vertical menu
  scrolling. It is a non-modal disclosure, not a modal focus trap.
- Added a skip link, document scroll padding, shared visible focus and a standard
  scrollbar baseline with stable gutter and forced-colors support.
- Koundé's illustrative zone now matches its existing right-defence label.
  This corrects a diagram mismatch; it adds no measured tactical data.

## Magic UI decisions

Read the installed Magic UI skill, component reference and recipes. Used its
patterns through existing project primitives, without installing registry code:

| Pattern | Where | Reason |
| --- | --- | --- |
| Text Animate / directional reveal | Squad heading and profile name, using Reveal's optional mask | Establishes headline hierarchy without character-by-character delays or blur |
| Shimmer / light sweep | Player artwork on hover or keyboard focus | A single tactile response to the selected card; no continuous effect or cursor tracking |

Sources: [Text Animate](https://magicui.design/docs/components/text-animate),
[Shimmer Button](https://magicui.design/docs/components/shimmer-button).
These are restrained adaptations, not installed Magic UI components. Particles,
warp backgrounds, looping border beams, sparkles and number tickers were rejected:
they would compete with names and imply activity in an archival collection.

## QA evidence

Browser inventory returned `{"apps":[],"browsers":[]}`. No screenshots were
captured and no browser automation was available. HTTP and server-rendered checks
are not labelled visual or end-to-end browser checks.

| Area | Completed | Still unverified |
| --- | --- | --- |
| Routes | HTTP 200 for `/`, `/squad` and all eight profiles; invalid slug HTTP 404 | Client-side clicks/back/forward in a browser |
| Desktop/tablet | Source review of 1/2/3/4-column breakpoints, min-width and header controls | Rendered composition, font metrics and overflow |
| Mobile 375/390/430 px | Fluid type, wrapped filters, touch dimensions and stacked profile/navigation reviewed in code | Actual layout, touch interaction and horizontal overflow at each width |
| Filters | All five control states rendered server-side; expected position counts checked | Repeated rapid clicking and visual position transitions |
| Accessibility | Native semantics, heading markup, labels, focus CSS, skip target, menu recovery and callback regression checked | Real keyboard traversal, screen reader announcements, focus visibility and computed contrast |
| Reduced motion | Executable policy checks for all directions, mask/scale reset and zero stagger; CSS reviewed | Actual `prefers-reduced-motion` media emulation and live preference changes |
| Animation | Existing Motion easing, capped stagger, transform/opacity policy and disabled reduced-motion effects reviewed | Smoothness, flicker and frame timings |
| States | Missing/empty statistics and zero-value rendering tested; loading/error/empty-result code reviewed | Browser fault injection and recovery interaction |

Commands and results:

- `npm.cmd run typecheck`: pass.
- `npm.cmd run lint`: pass, no warnings or errors.
- `npm.cmd run build`: pass, hub and all eight profiles generated.
- `node scripts/check-squad-components.cjs`: pass; model integrity, position
  counts, five selected-filter states, missing/zero metrics, source requirements,
  reduced-motion policy, unclipped ordinary reveals and link callback forwarding.
- `node scripts/check-squad.mjs http://localhost:3100`: pass; homepage, hub,
  profiles, metadata, previous/next destinations including wraparound,
  unpublished-statistics exclusion and real HTTP 404.
- `git diff --check`: pass; only Windows line-ending notices.
- Existing Google Fonts CSS URL: HTTP 200, checked directly. This does not prove
  font loading or layout in a browser.

### Supplemental skill audit

Ran `audit_project.py --mode=strict` through WSL. Raw final output is retained in
`squad-static-audit.json`; exit status is **1**, not a clean pass. Its scrollbar
finding was fixed. Two remaining findings are verified parser false positives
for `<Button href="/">` in `app/error.tsx` and `app/not-found.tsx`: the auditor
lowercases the component tag and classifies it as a native actionless button.
The shared component returns Next Link for `href`, and the regression test
confirms rendered `<a href="/squad">` markup. No audit rules were suppressed.

## Performance and remaining limitations

Production output: `/squad` route JS **2.74 kB**, first load **135 kB**; profile
route JS **768 B**, first load **133 kB**. The prior hub route was 3.89 kB. No
new animation library, image download, polling, pointer tracking or animation
loop was introduced. Core Web Vitals and device-level performance are unmeasured.

The previous sandboxed preview logged blocked external homepage image fetches
and an existing `images.domains` deprecation warning. Squad artwork has no remote
image dependency. Homepage remote-image loading remains unverified in a browser;
that legacy configuration was not rewritten during this scoped pass.

Legacy homepage season totals/radar ratings still lack provenance; they are not
published by the new archive. The archive's season metrics remain unavailable.
Licensed player portraits and verified statistical datasets remain future work.

Next milestone: complete the rendered desktop/tablet/mobile browser QA matrix.
