# FC Barcelona Fan Experience — Design System

## 1. Aesthetic Direction & Brand Identity

The visual philosophy draws from high-end European editorial magazines, cinematic sports broadcasting, and architectural minimalism. It avoids generic modern SaaS tropes (such as repetitive glossy pills, rainbow gradients, and random floating cards).

### Key Descriptors
- **Atmospheric & Nocturnal**: Dark obsidian, carbon, and midnight canvases illuminated by deep Blaugrana radiance.
- **Editorial Typography**: Imposing condensed grotesque titles paired with razor-sharp geometric sans-serif body copy and monospace data labels.
- **Tactile & Structural**: Clean thin borders (`1px` subtle borders), asymmetric split grids, and fine grain texture.
- **Catalan Heritage**: Subtle Senyera gold accents and Catalan flag geometry used sparingly to denote achievement, captaincy, and trophies.

---

## 2. Color Palette & Tokens

### Primary Club Hues
- **Blaugrana Blue (Blau)**: `#004D98`
  - Deep Navy Canvas: `#050B14`
  - Blau Glow: `#0A3871`
  - Blau Electric: `#1565C0`
- **Blaugrana Garnet (Grana)**: `#A50044`
  - Deep Grana: `#72002E`
  - Grana Velvet: `#520222`
  - Grana Highlight: `#D6226B`
- **Senyera Gold (Or)**: `#EDBB00`
  - Gold Light: `#FFD23F`
  - Gold Antique: `#C69214`

### Surfaces & Dark Neutrals
- **Obsidian 950 (Main canvas)**: `#060709`
- **Carbon 900 (Section surface)**: `#0C0E14`
- **Card Surface 850 (Elevated items)**: `#12151F`
- **Surface Highlight (Hover/Active)**: `#1B2030`
- **Subtle Border (Hairline)**: `rgba(255, 255, 255, 0.08)`
- **Accent Border (Blaugrana tint)**: `rgba(0, 77, 152, 0.25)`

### Typography Colors
- **Text Dominant (Headings)**: `#FFFFFF`
- **Text Secondary (Body/Editorial)**: `#A1A7B5`
- **Text Muted (Captions/Meta)**: `#636B7E`
- **Text Accent (Gold)**: `#EDBB00`

---

## 3. Typography Hierarchy

### Font Families
- **Display / Heading**: *Cabinet Grotesk / Syne / Clash Display / Oswald* (Condensed, bold, commanding).
- **Body & Editorial**: *Inter / Plus Jakarta Sans* (Legible, neutral, crisp).
- **Data & Numbers**: *JetBrains Mono / Space Mono* (Monospace alignment for xG, minutes, shirt numbers, and timestamps).

### Type Scale
- **Display 1 (Hero Title)**: `text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase font-black font-display`
- **Display 2 (Section Title)**: `text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase font-extrabold`
- **Heading 1 (Card/Feature Title)**: `text-2xl sm:text-3xl font-bold tracking-tight`
- **Heading 2 (Sub-section)**: `text-xl sm:text-2xl font-semibold`
- **Kicker / Eyebrow**: `text-xs md:text-sm uppercase tracking-widest font-mono text-gold-400 font-semibold`
- **Body Large**: `text-lg sm:text-xl font-normal text-muted-foreground leading-relaxed`
- **Body Regular**: `text-base font-normal text-muted-foreground leading-normal`
- **Body Small**: `text-sm font-normal text-muted-foreground`
- **Stat Value**: `text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tighter text-white`

---

## 4. Spacing & Container System

- **Max Width**:
  - Full Bleed: `w-full`
  - Container Wide: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
  - Container Editorial: `max-w-5xl mx-auto px-4 sm:px-6`
  - Container Reading: `max-w-3xl mx-auto px-4`
- **Section Padding**:
  - Hero: `pt-28 pb-16 sm:pt-36 sm:pb-24`
  - Standard Section: `py-16 sm:py-24 lg:py-32`
  - Compact Section: `py-10 sm:py-16`

---

## 5. Component Style Conventions

### Cards & Panels
- Background: `bg-card/70 backdrop-blur-md`
- Border: `border border-white/[0.08]`
- Hover: `hover:border-blau-500/30 hover:shadow-2xl hover:shadow-blau-950/40 transition-all duration-300`
- Radius: `rounded-2xl` for cards, `rounded-full` for badges/buttons.

### Buttons & Interactive Badges
- **Primary Button**: Blaugrana gradient accent or pure white with dark typography, high contrast, subtle inner glow.
- **Secondary Button**: Translucent obsidian with crisp border `border-white/15 hover:border-white/40`.
- **Ghost Button**: Subtle text transition with interactive underline or arrow spring slide.

## Squad archive refinement decisions

The Squad collection retains the runtime palette and Syne / Inter / JetBrains
Mono typography defined by `tailwind.config.ts` and `app/globals.css`. This is an
English-language editorial content experience, not an admin application.

- Original shirt-number artwork is the signature visual. Type scales from its
  containing card/profile using container query units, not the viewport.
- A short masked headline reveal is the hero moment; the existing `Reveal`
  primitive owns its motion policy in `lib/motion.ts`.
- A single, low-opacity light sweep responds to card hover or keyboard focus.
  There are no ambient loops, pointer trackers, animated ratings or border beams.
- Filter updates replace results immediately, preserve surviving card identity,
  and animate card positions with transforms. A one-row minimum prevents a
  collapsed result region; the page still grows/shrinks with the selected results.
- Shared focus rings use `--gold`. A skip link and document scroll padding keep
  navigation accessible around the fixed header. The mobile menu is a non-modal
  disclosure with bounded scrolling, Escape and focus-leave dismissal.
- The document scrollbar baseline uses `--scrollbar-track`, `--scrollbar-thumb`,
  `--scrollbar-hover` and `--scrollbar-active` in `app/globals.css`, with standard
  properties, WebKit fallbacks, stable gutter and system forced-colors handling.
- Reduced motion removes reveal translation, masking and stagger; static content,
  position filtering and gold selection/focus cues remain available.

These choices preserve the homepage's visual identity. Browser rendering remains
an explicit verification requirement; source inspection alone is not visual QA.
