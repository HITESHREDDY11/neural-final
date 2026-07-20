'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const; // Premium easeOutExpo

export const reveal: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease },
  },
};


export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

/** Fades + lifts children into view when scrolled into the viewport. */
export function Reveal({
  children,
  className,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={reveal} className={className}>
      {children}
    </motion.div>
  );
}
