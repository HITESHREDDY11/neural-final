'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useInView } from 'framer-motion';
import Scene from './Scene';

export default function LazyScene() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '200px' });

  // Mount scene immediately on client side for instant rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 transition-opacity duration-700 ease-out"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {mounted && (
        <Suspense fallback={null}>
          <Scene inView={inView} />
        </Suspense>
      )}
    </div>
  );
}
