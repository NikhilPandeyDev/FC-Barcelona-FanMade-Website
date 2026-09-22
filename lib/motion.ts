import { Variants, Transition } from 'framer-motion';

export const EASINGS = {
  // Smooth editorial deceleration
  editorial: [0.16, 1, 0.3, 1],
  // Athletic snappy punch
  athletic: [0.25, 0.1, 0.25, 1.0],
  // Micro-interaction crispness
  snappy: [0.4, 0, 0.2, 1],
  // Ambient breathing
  ambient: [0.33, 1, 0.68, 1],
} as const;

export const TRANSITIONS = {
  editorial: {
    duration: 0.8,
    ease: EASINGS.editorial,
  } as Transition,
  fast: {
    duration: 0.35,
    ease: EASINGS.snappy,
  } as Transition,
  spring: {
    type: 'spring',
    damping: 24,
    stiffness: 280,
  } as Transition,
  bouncySpring: {
    type: 'spring',
    damping: 15,
    stiffness: 300,
  } as Transition,
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};

export const fadeScaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: EASINGS.editorial,
    },
  }),
};
