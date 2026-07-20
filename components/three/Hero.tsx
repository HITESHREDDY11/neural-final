'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LazyScene from './LazyScene';

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background">
      {/* 3D blueprint canvas */}
      <div className="absolute inset-0 z-0">
        <LazyScene />
      </div>

      {/* Blueprint grid overlay */}
      <div className="pointer-events-none absolute inset-0 bp-grid-fine opacity-40" />

      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 60% at 50% 50%, transparent 30%, hsl(222 47% 6%) 100%)' }}
      />

      {/* Nav top gradient */}
      <div className="pointer-events-none absolute top-0 left-0 h-32 w-full bg-gradient-to-b from-background to-transparent" />
      {/* Bottom gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-background to-transparent" />

      {/* Hero text */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center md:items-start md:text-left md:pl-20 lg:pl-32">
        <motion.div id="hero-text" variants={container} initial="hidden" animate="show" className="max-w-2xl">

          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            INDUSTRIAL AUTOMATION EXPERTS
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[5rem]"
          >
            Redefining Innovation
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &amp; Excellence
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto md:mx-0 mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Making enterprises safe, smart, and sustainable with
            precision-engineered automation systems trusted by 60+
            pharmaceutical leaders.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href="#products"
              className="group relative inline-flex h-[52px] items-center gap-2.5 overflow-hidden rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Explore Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
