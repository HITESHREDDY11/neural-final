'use client';

import { ArrowUpRight, DoorClosed, Wind, Gauge } from 'lucide-react';
import { Reveal, RevealItem } from './Reveal';
import Link from 'next/link';

const products = [
  {
    tag: 'Access Control',
    icon: DoorClosed,
    title: 'Door Interlocking System',
    body: 'Advanced access control ensuring air quality and pressure regulation in cleanrooms.',
    specs: ['Multi-door interlock', 'Pressure-safe logic', 'LED status indicators'],
    href: '/products/door-interlocking-system',
  },
  {
    tag: 'Controller',
    icon: Wind,
    title: 'Air Shower Controller',
    body: 'Intelligent control units removing particulate contamination from personnel before cleanroom entry.',
    specs: ['Programmable cycles', 'HEPA integration', 'Touch panel HMI'],
    href: '/products/air-shower-controller',
  },
  {
    tag: 'Sensor',
    icon: Gauge,
    title: 'Digital Differential Pressure Indicator',
    body: 'Digital precision instruments for measuring pressure differences across critical zones.',
    specs: ['±0.25% accuracy', '4–20 mA output', 'Data logging'],
    href: '/products/differential-pressure-indicator',
  },
];

export default function Products() {
  return (
    <section id="products" className="border-y border-border/50 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Our Solutions</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Featured Products
              </h2>
            </RevealItem>
          </div>
          <RevealItem>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              High-performance systems engineered for reliability in pharmaceutical and industrial environments.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="mt-16 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <RevealItem key={p.title}>
              <Link
                href={p.href}
                aria-label={`View ${p.title} product details`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_70px_-24px_rgba(59,130,246,0.2)]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{p.tag}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                <ul className="mt-6 space-y-2 border-t border-border/50 pt-5">
                  {p.specs.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-foreground/70">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
                <span className="mt-7 flex items-center text-sm font-medium text-foreground">
                  View Details
                  <span className="ml-1.5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary">→</span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="mt-12 flex justify-center">
          <RevealItem>
            <Link
              href="/products"
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-border px-7 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              View All Products
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
