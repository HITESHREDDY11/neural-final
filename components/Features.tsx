'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Cpu, Crosshair, BadgeCheck } from 'lucide-react';
import { Reveal, RevealItem } from './Reveal';

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'High Quality & Affordable',
    body: 'Our systems are affordable with the highest quality to keep your enterprise safe and secure at every step — without compromise on value.',
    points: ['ISO-grade components', 'Cost-effective scaling', 'Lifetime support'],
    from: { x: -36, y: 0 },
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Smart & Efficient Team',
    body: 'Highly trained engineers manufacturing electronic controllers and instruments that meet rigorous pharmaceutical compliance standards.',
    points: ['In-house R&D', 'Rapid prototyping', 'Custom firmware'],
    from: { x: 0, y: 36 },
  },
  {
    num: '03',
    icon: Crosshair,
    title: 'Precision Engineered',
    body: 'Every product is designed for pharmaceutical-grade compliance, built to withstand demanding industrial environments reliably.',
    points: ['Cleanroom certified', 'GMP compliant', 'Calibrated accuracy'],
    from: { x: 36, y: 0 },
  },
];

function FeatureCard({
  f,
  index,
  inView,
}: {
  f: (typeof features)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: f.from.x, y: f.from.y, filter: 'blur(8px)' }}
      animate={
        inView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}
      }
      transition={{ duration: 0.88, ease, delay: index * 0.12 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 transition-shadow duration-500 hover:shadow-[0_28px_70px_-24px_rgba(59,130,246,0.2)]"
    >
      {/* Top accent line — draws in on scroll entry */}
      <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden rounded-t-2xl">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-primary to-cyan-400"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{
            duration: 0.95,
            ease,
            delay: index * 0.12 + 0.3,
          }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Hover ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/20 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top row: icon + number */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 18,
            delay: index * 0.12 + 0.22,
          }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <f.icon className="h-5 w-5" />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: index * 0.12 + 0.18 }}
          className="text-3xl font-bold tracking-tighter text-border transition-colors duration-500 group-hover:text-primary/20"
        >
          {f.num}
        </motion.span>
      </div>

      {/* Body */}
      <h3 className="mt-7 text-xl font-semibold text-foreground">{f.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>

      {/* Checklist — staggers in */}
      <ul className="mt-6 space-y-2.5 border-t border-border/50 pt-5">
        {f.points.map((p, pi) => (
          <motion.li
            key={p}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              ease,
              delay: index * 0.12 + 0.5 + pi * 0.08,
            }}
            className="flex items-center gap-2.5 text-sm text-foreground/80"
          >
            <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
            {p}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section
      id="why"
      className="relative mx-auto max-w-7xl px-6 pt-16 pb-16 sm:px-10 lg:px-16 lg:pt-20 lg:pb-20"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[96px]" />

      {/* Section header */}
      <Reveal className="max-w-2xl">
        <RevealItem>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary/40" />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
              Why Choose Us
            </p>
          </div>
        </RevealItem>
        <RevealItem>
          <h2 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Built on Trust &amp; Precision
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            Three principles guide every system we build — quality without
            compromise, engineering intelligence, and pharmaceutical-grade
            precision.
          </p>
        </RevealItem>
      </Reveal>

      {/* Cards — consolidated scroll trigger */}
      <div ref={ref} className="mt-16 grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={f.title} f={f} index={i} inView={inView} />
        ))}
      </div>

      {/* Stats band */}
      <Reveal className="mt-20">
        <RevealItem>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[
              { num: '60+', label: 'Trusted Clients', sub: 'Across India & Abroad' },
              { num: '7+', label: 'Product Lines', sub: 'Cleanroom Certified' },
              { num: '150+', label: 'Team Members', sub: 'Skilled Professionals' },
              { num: '100%', label: 'Quality Assured', sub: 'Pharma Grade' },
              { num: '2019', label: 'Established', sub: 'Years of Expertise' },
            ].map((s) => (
              <div
                key={s.label}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.05] px-6 py-10 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:bg-white/[0.08] hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.12)]"
              >
                {/* Subtle top light bar on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] scale-x-0 rounded-t-2xl bg-gradient-to-r from-primary to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" />
                
                {/* Radial glow background on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.06),transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent transition-all duration-300 group-hover:scale-105">
                  {s.num}
                </span>
                <span className="mt-3 text-sm font-semibold text-foreground">
                  {s.label}
                </span>
                <span className="mt-1 text-xs text-muted-foreground group-hover:text-muted-foreground/80">
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </RevealItem>
      </Reveal>
    </section>
  );
}
