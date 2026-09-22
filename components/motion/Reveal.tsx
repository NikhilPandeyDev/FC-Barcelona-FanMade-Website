'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  scale?: boolean;
  className?: string;
  width?: 'fit' | 'full';
  triggerOnce?: boolean;
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
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    
    const distance = 28;
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, scale: scale ? 0.96 : 1 };
      case 'down':
        return { opacity: 0, y: -distance, scale: scale ? 0.96 : 1 };
      case 'left':
        return { opacity: 0, x: distance, scale: scale ? 0.96 : 1 };
      case 'right':
        return { opacity: 0, x: -distance, scale: scale ? 0.96 : 1 };
      case 'none':
      default:
        return { opacity: 0, scale: scale ? 0.96 : 1 };
    }
  };

  const getVisiblePosition = () => {
    if (shouldReduceMotion) return { opacity: 1 };

    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0, scale: 1 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0, scale: 1 };
      case 'none':
      default:
        return { opacity: 1, scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getVisiblePosition()}
      viewport={{ once: triggerOnce, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: EASINGS.editorial,
      }}
      className={`${width === 'full' ? 'w-full' : 'w-fit'} ${className}`}
    >
      {children}
    </motion.div>
  );
}
