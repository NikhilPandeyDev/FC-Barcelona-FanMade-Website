# Match Center checkpoint QA

Validated on 2 October 2026 before the football-data branch was created.

- Production build: passed, hub plus three static match detail pages generated.
- TypeScript and lint: passed (production build includes both checks).
- Model/state checks: passed match normalization, combined filters, missing/zero
  values, score ordering, timezones, source safeguards and tactical fallback.
- Existing Squad component checks: passed, including reduced-motion policy.
- Production HTTP smoke: homepage, Squad, all eight player profiles, Match Center,
  all three match details and invalid match/player routes checked.
- Static design audit: two existing false positives in shared error/not-found
  pages. Both are `Button href="/"` controls, rendered as working anchors by the
  shared Button component. No new Match Center findings. Report is retained.

The previous route assertion searched raw HTML for a decimal value and matched
an unrelated SVG path. The data-model test checks excluded legacy fields; route
checks now target the actual stale labels instead.

Rendered browser QA remains outstanding. Earlier browser surfaces were absent.
On this run Computer Use found browser windows, then stopped because it could
not determine the current browser URL with sufficient confidence to enforce its
policy. UI automation stopped. No desktop/tablet/375/390/430px rendering, keyboard
interaction, animation smoothness or browser-console pass is claimed.

The responsive CSS, native controls, labels, focus styles and reduced-motion
branches were inspected in source and model/SSR checks. Performance evidence is
the production build: Match Center hub 135 kB first-load JS, details 134 kB; no new
dependencies or image downloads. These measurements are not Core Web Vitals.
