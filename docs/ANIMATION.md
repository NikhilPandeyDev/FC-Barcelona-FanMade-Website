# FC Barcelona Fan Experience — Animation & Motion System

## 1. Motion Philosophy

Motion is treated as a narrative instrument that reinforces spatial depth, editorial impact, and emotional weight. It avoids frivolous bouncy micro-animations in favor of broadcast-quality precision.

### Golden Rules
1. **Purpose-Driven**: Animate to reveal information, establish hierarchy, or confirm user action.
2. **Snappy & High Tension**: Athletic physics — fast starts, smooth deceleration (custom cubic-bezier easings).
3. **Respect Accessibility**: Complete fallback for users with `prefers-reduced-motion: reduce`.
4. **Hardware Accelerated**: Constrain animations to `transform` (`translate3d`, `scale`, `rotate`), `opacity`, and `clip-path`.

---

## 2. Easing & Timing Curves

```typescript
// /lib/motion.ts
export const EASINGS = {
  // Cinematic editorial reveal (smooth deceleration)
  editorial: [0.16, 1, 0.3, 1],
  // Athletic punchy spring
  athletic: [0.25, 0.1, 0.25, 1.0],
  // Precise UI micro-interaction
  snappy: [0.4, 0, 0.2, 1],
  // Dramatic hero image zoom-in
  ambient: [0.33, 1, 0.68, 1],
} as const;

export const DURATIONS = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.45,
  slow: 0.75,
  cinematic: 1.2,
} as const;
```

---

## 3. Core Motion Variants

### 3.1 Fade Up Reveal (`fadeUp`)
```typescript
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.slow,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};
```

### 3.2 Staggered Container (`staggerContainer`)
```typescript
export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};
```

### 3.3 Text Clip Reveal (`clipReveal`)
```typescript
export const clipRevealVariant = {
  hidden: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', y: '40%' },
  visible: (delay: number = 0) => ({
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    y: '0%',
    transition: {
      duration: DURATIONS.cinematic,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};
```

### 3.4 Magnetic Hover (`magnetic`)
Used on prominent interactive buttons, badges, and cursor followers to create tactile weight.

---

## 4. Reduced Motion Behavior

All motion components must verify `useReducedMotion()` from `motion/react` (or `framer-motion`).
When enabled:
- Translates are clamped to `0px`.
- Transitions switch to simple `opacity` fade with duration `0.2s`.
- Infinite ambient loops and parallax effects are suspended.
