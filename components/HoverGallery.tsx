'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PANELS = [
  {
    id: 1,
    label: '01',
    tag: 'Access Control',
    title: 'Door\nInterlocking\nSystems',
    summary: 'Pressure-safe multi-door interlock logic for pharmaceutical-grade cleanroom compliance.',
    image: '/assets/images/panel_door_interlocking.jpg',
  },
  {
    id: 2,
    label: '02',
    tag: 'Decontamination',
    title: 'Air Shower\nController\nSystems',
    summary: 'Intelligent personnel decontamination before cleanroom entry — HEPA integrated with programmable cycle logic.',
    image: '/assets/images/panel_air_shower.jpg',
  },
  {
    id: 3,
    label: '03',
    tag: 'Measurement',
    title: 'Differential\nPressure\nIndicators',
    summary: 'Digital precision instruments with ±0.25% accuracy and 4–20 mA output for critical zone monitoring.',
    image: '/assets/images/panel_differential_pressure.jpg',
  },
  {
    id: 4,
    label: '04',
    tag: 'Automation',
    title: 'Industrial\nControl\nPanels',
    summary: 'Custom-engineered control solutions for GMP-compliant manufacturing lines and facility automation.',
    image: '/assets/images/panel_control_panel.jpg',
  },
  {
    id: 5,
    label: '05',
    tag: 'Monitoring',
    title: 'Environmental\nMonitoring\nSolutions',
    summary: 'Real-time tracking of cleanroom temperature, humidity, pressure, and particle count.',
    image: '/assets/images/panel_environmental_monitoring.jpg',
  },
];

export default function HoverGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-[hsl(222,47%,6%)] px-6 py-10 sm:px-10 lg:px-16">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-center gap-3"
      >
        <span className="h-px w-10 bg-[hsl(217,91%,60%,0.4)]" />
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[hsl(217,91%,60%)]">
          Explore Solutions
        </p>
      </motion.div>

      {/* ── Desktop: hover-accordion gallery ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden h-[82vh] min-h-[480px] overflow-hidden rounded-2xl border border-[hsl(222,30%,16%)] md:block"
        onMouseLeave={() => setActive(null)}
      >
        <div className="flex h-full w-full">
          {PANELS.map((panel) => {
            const isActive = active === panel.id;
            // Use width % instead of flex-grow so the transition works in all browsers
            const widthPct = isActive
              ? '40%'
              : active !== null
              ? '15%'
              : '20%';

            return (
              <div
                key={panel.id}
                onMouseEnter={() => setActive(panel.id)}
                onClick={() => setActive(isActive ? null : panel.id)}
                className="relative h-full overflow-hidden"
                style={{
                  width: widthPct,
                  minWidth: 0,
                  transition: 'width 0.72s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'width',
                  transform: 'translateZ(0)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${panel.image})`,
                    filter: isActive
                      ? 'brightness(0.6) saturate(0.95)'
                      : 'brightness(0.32) saturate(0.65)',
                    transition: 'filter 0.72s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Navy overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, hsl(222 47% 6% / ${isActive ? 0.1 : 0.45}) 0%, hsl(222 47% 6% / 0.85) 100%)`,
                    transition: 'background 0.72s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Blue glow strip at top — active only */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background: 'hsl(217,91%,60%)',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Vertical right divider */}
                <div className="absolute right-0 top-0 z-10 h-full w-px bg-[hsl(222,30%,16%)]" />

                {/* Panel number — top left */}
                <div className="absolute left-5 top-6 z-10">
                  <span
                    className="block font-mono text-[12px] font-bold tracking-[0.2em] transition-colors duration-500"
                    style={{
                      color: isActive ? 'hsl(217 100% 72%)' : 'rgba(255, 255, 255, 0.75)',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    {panel.label}
                  </span>
                </div>

                {/* Idle tag — vertical center */}
                <div
                  className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-center"
                  style={{
                    opacity: isActive ? 0 : active !== null ? 0.45 : 0.9,
                    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="origin-center -rotate-90 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.3em] text-white"
                    style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.8)' }}
                  >
                    {panel.tag}
                  </span>
                </div>

                {/* Active content — slides up from bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 z-10 p-7"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(14px)',
                    transition: 'opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1), transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(217,100%,72%)]" />
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.22em]"
                      style={{
                        color: 'hsl(217 100% 72%)',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      {panel.tag}
                    </span>
                  </div>

                  <h3
                    className="mb-4 whitespace-pre-line text-[2rem] font-bold leading-[1.08] tracking-tight text-white lg:text-[2.4rem]"
                    style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.95)' }}
                  >
                    {panel.title}
                  </h3>

                  <div className="mb-4 h-px w-8 bg-[hsl(217,100%,72%)]" />

                  <p
                    className="max-w-xs text-[13.5px] leading-relaxed text-white/90 font-medium"
                    style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)' }}
                  >
                    {panel.summary}
                  </p>

                  <Link
                    href="/solutions"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-all duration-300 hover:gap-3"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 text-white" />
                  </Link>
                </div>

                {/* Compact idle label — bottom */}
                <div
                  className="absolute inset-x-0 bottom-5 z-10 px-5"
                  style={{
                    opacity: isActive ? 0 : active !== null ? 0.35 : 0.85,
                    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: 'none',
                  }}
                >
                  <p
                    className="truncate text-[10.5px] font-bold uppercase tracking-[0.2em] text-white"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.9)' }}
                  >
                    {panel.tag}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hint */}
        <div className="pointer-events-none absolute bottom-5 right-6 z-20 flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/20">
            Hover to explore
          </span>
          <span className="h-px w-5 bg-white/10" />
        </div>
      </motion.div>

      {/* ── Mobile: vertical card stack ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 gap-4 md:hidden"
      >
        {PANELS.map((panel) => (
          <div
            key={panel.id}
            className="relative overflow-hidden rounded-2xl border border-[hsl(222,30%,16%)]"
          >
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center brightness-[0.45] saturate-75"
              style={{ backgroundImage: `url(${panel.image})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,47%,6%)/90%] via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white/60">
                  {panel.label}
                </span>
                <span className="h-px w-4 bg-[hsl(217,100%,72%,0.5)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[hsl(217,100%,72%)]">
                  {panel.tag}
                </span>
              </div>

              <h3 className="whitespace-pre-line text-xl font-bold leading-tight tracking-tight text-white">
                {panel.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {panel.summary}
              </p>

              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[hsl(217,100%,72%)]"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
