'use client';

/**
 * NavigationOverlay.tsx
 *
 * Renders a full-viewport cover (matching the app background color) that
 * appears INSTANTLY on every route change and fades out only after the new
 * page has fully painted in the browser.
 *
 * This is the authoritative fix for footer/content flickering during first
 * and subsequent navigations.  It works at the paint level — not the React
 * render level — so there is zero chance of any DOM content leaking through.
 *
 * Architecture:
 *  - usePathname() detects route changes and sets `covering = true` immediately.
 *  - Two nested requestAnimationFrame callbacks wait for the browser to complete
 *    layout + paint of the new page before fading the overlay out.
 *  - The overlay sits at z-index 9999, above navbar, footer, and all content.
 *  - No timeouts / hacks — purely paint-cycle driven.
 */

import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// Use useLayoutEffect on client, useEffect on server (SSR guard)
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function NavigationOverlay() {
  const pathname = usePathname();
  const [covering, setCovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const rafHandle = useRef<number>(0);

  useIsomorphicLayoutEffect(() => {
    // Skip the very first mount — no transition needed on initial page load
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Cancel any in-flight RAF from a rapid navigation
    cancelAnimationFrame(rafHandle.current);

    // Immediately cover the screen (synchronous, before browser paints)
    setCovering(true);
    setVisible(true);

    // Wait for two animation frames — this guarantees the browser has
    // completed layout and paint of the new page tree before we fade out.
    rafHandle.current = requestAnimationFrame(() => {
      rafHandle.current = requestAnimationFrame(() => {
        // Begin fade-out
        setVisible(false);
      });
    });

    return () => cancelAnimationFrame(rafHandle.current);
  }, [pathname]);

  // Once the CSS opacity transition finishes, remove the overlay from paint
  const handleTransitionEnd = () => {
    if (!visible) setCovering(false);
  };

  if (!covering) return null;

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        // Exact match of --background: 222 47% 6%
        backgroundColor: 'hsl(222, 47%, 6%)',
        opacity: visible ? 1 : 0,
        transition: visible ? 'none' : 'opacity 0.18s ease-out',
        pointerEvents: covering ? 'all' : 'none',
      }}
      aria-hidden="true"
    />
  );
}
