'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';

/**
 * Lazy-loads the R3F canvas (client-only) and fades it in from 0→1 opacity
 * on mount, so the page background remains visible behind the model.
 */
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
});

export default function LazyScene() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '200px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 transition-opacity duration-1000 ease-out"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {mounted && <Scene inView={inView} />}
    </div>
  );
}

