'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

/** Wraps the app with Lenis smooth scrolling. Respects prefers-reduced-motion. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ─── SCROLL TO TOP ON EVERY ROUTE CHANGE ────────────────────────────────────
  // This is the primary fix for the "footer flash" — when navigating to a new
  // page the browser retains scroll position, so users see the bottom of the
  // old page. This effect fires before the new page paints.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip Lenis for users who opt out of motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    // Expose lenis on window so anchor clicks can use lenis.scrollTo()
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      if (target) {
        // Wait for components/3D canvas to render or page transition to finish
        const timeoutId = setTimeout(() => {
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 40);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
