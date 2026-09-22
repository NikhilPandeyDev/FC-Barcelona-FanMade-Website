'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getRevealAnimation, type RevealDirection } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  scale?: boolean;
  className?: string;
  width?: 'fit' | 'full';
  triggerOnce?: boolean;
  clip?: boolean;
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  scale = false,
  className = '',
  width = 'full',
  triggerOnce = true,
  clip = false,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const animation = getRevealAnimation({ direction, delay, duration, scale, clip, reduced: !!shouldReduceMotion });

  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.visible}
      viewport={{ once: triggerOnce, margin: '-40px' }}
      transition={animation.transition}
      className={`${width === 'full' ? 'w-full' : 'w-fit'} ${className}`}
    >
      {children}
    </motion.div>
  );
}
