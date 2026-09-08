'use client';

import type { ReactNode } from 'react';

// Reveal / RevealItem — animations removed for instant rendering performance.
// These wrappers are kept as pass-throughs so existing import sites are unbroken.

export const reveal = {};
export const stagger = {};

/** Passes children through immediately — no scroll-triggered fade-in. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
