# FC Barcelona Fan Experience — Agent Instructions

## Project

This is an unofficial, fan-made FC Barcelona web experience.

The goal is to create a premium, cinematic, highly interactive football website rather than reproduce the official FC Barcelona website.

Read the relevant files in `/docs` before making major architectural or design changes.

## Product principles

* Prioritize visual quality, interaction quality, accessibility, responsiveness, and performance.
* The website should feel premium, editorial, cinematic, and modern.
* Avoid generic AI-generated landing-page aesthetics.
* Avoid repetitive glassmorphism, excessive gradients, random blobs, and unnecessary rounded cards.
* Design every section intentionally.
* Motion should communicate hierarchy, depth, interaction, or storytelling. Do not animate everything simply because animation is possible.
* Preserve strong typography and whitespace.
* Mobile experience is a first-class experience, not a desktop layout squeezed onto a phone.

## Technical stack

Use:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui for reusable primitives where appropriate
* Motion for React for most UI animation
* GSAP only when Motion is not the appropriate tool
* Zod for validating external data
* Recharts for statistical visualization where appropriate

Do not introduce additional major libraries without a clear reason.

## Architecture

Keep content/data separate from presentation.

Prefer structures such as:

* `/app` for routes
* `/components` for reusable UI
* `/components/players`
* `/components/matches`
* `/components/history`
* `/components/fans`
* `/lib` for utilities and integrations
* `/data` for local/static data
* `/docs` for project documentation

Do not duplicate data across components.

Create reusable primitives for repeated visual patterns.

## Data

Never invent player statistics, match results, trophies, fixtures, injuries, or other factual football information.

Clearly separate:

1. static editorial content
2. historical data
3. current football data
4. user-generated content

External API credentials must never be exposed to the client.

Use server-side fetching or secure server-side routes for protected APIs.

Validate external API responses before using them.

Handle missing/null data gracefully.

## Animation

Use animation intentionally.

Prefer:

* opacity
* transform
* scale
* clip-path
* layout animation
* shared-element transitions
* scroll-linked effects
* spring interactions
* staggered reveals
* SVG animation

Avoid expensive continuous JavaScript animation when CSS or browser-native animation can achieve the same result.

Respect `prefers-reduced-motion`.

Every major animation must have a sensible reduced-motion behavior.

Animation must not prevent navigation, reading, clicking, or keyboard use.

## Performance

Protect:

* Core Web Vitals
* image loading
* JavaScript bundle size
* animation performance
* mobile performance

Use Next.js image optimization where appropriate.

Lazy-load heavy sections.

Do not load Three.js or other heavy libraries globally if only one page needs them.

Avoid unnecessary client components.

Keep server components server-side where practical.

## Accessibility

Maintain:

* semantic HTML
* keyboard navigation
* visible focus states
* sufficient color contrast
* descriptive labels
* alt text
* reduced-motion support
* accessible dialogs and menus

Never sacrifice usability for visual effects.

## Visual direction

The design should feel inspired by:

* elite football culture
* premium sports broadcasting
* editorial magazine design
* modern European architecture
* cinematic photography
* high-end product design

Do not imitate the FC Barcelona official website's layout, source code, visual design, or proprietary content.

The project should clearly present itself as unofficial/fan-made.

Use appropriately licensed, original, generated, or otherwise authorized imagery/assets.

## Development workflow

Before implementing a significant feature:

1. Inspect the existing architecture.
2. Identify reusable components.
3. Check relevant documentation.
4. Implement the smallest coherent change.
5. Run lint/typecheck/tests/build where appropriate.
6. Fix issues before finishing.
7. Avoid unrelated refactors.

Never rewrite large parts of the codebase unnecessarily.

Never delete working functionality merely to simplify a task.

## Coding style

Prefer:

* small composable components
* strong TypeScript types
* descriptive names
* minimal duplication
* predictable state management
* clear separation between data, behavior, and presentation

Avoid:

* giant components
* deeply nested conditional rendering
* duplicated constants
* unnecessary global state
* magic numbers scattered through animation logic

## Quality bar

Do not consider a feature complete merely because it works.

Before calling it finished, check:

* desktop
* tablet
* mobile
* keyboard navigation
* reduced motion
* loading states
* empty states
* error states
* animation smoothness
* visual consistency
* typography
* spacing
* image cropping
* console errors
* TypeScript errors
* production build
