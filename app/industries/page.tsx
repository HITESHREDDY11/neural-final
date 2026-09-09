'use client';

import { useState } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import { industries, Industry } from '@/lib/data';
import Link from 'next/link';
import { 
  ShieldAlert, Dna, Utensils, Building2, Microchip, Tv, FlaskConical, Binary, 
  ArrowRight, ShieldCheck, AlertCircle, HelpCircle, CheckCircle2, ChevronRight 
} from 'lucide-react';


const iconMap = {
  ShieldAlert: ShieldAlert,
  Dna: Dna,
  Utensils: Utensils,
  Building2: Building2,
  Microchip: Microchip,
  Tv: Tv,
  FlaskConical: FlaskConical,
  Binary: Binary
};

export default function IndustriesPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeInd = industries[activeIdx];

  const IconComponent = iconMap[activeInd.iconName] || ShieldAlert;

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* Background blueprint grids */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bp-grid" />
      <div className="absolute inset-0 z-0 pointer-events-none scan-line w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-[15%] left-[-10%] bg-glow-breathe-1" />
      <div className="absolute bottom-[20%] right-[-10%] bg-glow-breathe-2" />


      {/* Hero Header */}
      <section className="relative pt-36 pb-12 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Industries</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Target Sectors</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Certified Sectors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Applications</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Different industries require varying grades of cleanrooms and parameter controls. Learn how our custom interlocking controllers and telemetry sensors solve contamination and pressure control hurdles.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Split Control Dashboard */}
      <section className="relative pb-32 pt-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left Col: Navigation list tabs */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2 px-2">Industrial Sectors</span>
              {industries.map((ind, idx) => {
                const TabIcon = iconMap[ind.iconName] || ShieldAlert;
                return (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full flex items-center justify-between rounded-xl border p-4.5 text-left transition-all duration-300 ${
                      activeIdx === idx
                        ? 'border-primary/40 bg-primary/[0.03] shadow-[inset_0_0_15px_rgba(59,130,246,0.06)]'
                        : 'border-border/60 bg-card/25 hover:bg-secondary/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        activeIdx === idx ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                      }`}>
                        <TabIcon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`text-sm font-bold truncate ${activeIdx === idx ? 'text-primary' : 'text-foreground'}`}>
                          {ind.title}
                        </h4>
                        <span className="text-[10px] text-muted-foreground/80 block truncate mt-0.5">{ind.tagline}</span>
                      </div>
                    </div>
                    <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${activeIdx === idx ? 'text-primary translate-x-1' : 'text-muted-foreground'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Col: Active Industry Dashboard display */}
            <div className="lg:col-span-8 space-y-8 rounded-2xl border border-primary/20 bg-card/35 p-8 backdrop-blur-md relative overflow-hidden bp-grid-fine">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

              {/* Graphic + Info Header */}
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-foreground">{activeInd.title}</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{activeInd.description}</p>
                </div>
                {/* Stats Widget */}
                <div className="md:col-span-5 border border-border bg-secondary/10 rounded-xl p-5 text-center flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Compliance Target</span>
                  <div className="text-3xl font-extrabold text-accent mt-2">{activeInd.stats.value}</div>
                  <span className="text-xs font-semibold text-foreground/80 mt-1 uppercase tracking-wider">{activeInd.stats.label}</span>
                </div>
              </div>

              {/* Parallel Matrices: Challenges vs Solutions */}
              <div className="grid gap-6 md:grid-cols-2 border-t border-border/40 pt-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1.5 mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <span>Industry Challenges</span>
                  </h3>
                  <ul className="space-y-3">
                    {activeInd.challenges.map((c, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-muted-foreground leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive shrink-0 mt-1.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-4">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Neural Automation Solutions</span>
                  </h3>
                  <ul className="space-y-3">
                    {activeInd.solutions.map((sol, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs text-foreground/80 leading-relaxed">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        <span className="font-medium">{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="border-t border-border/40 pt-6 flex flex-wrap gap-4 items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Our systems are pre-calibrated to support cleanroom qualification checklists.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-xs font-semibold text-primary-foreground hover:bg-primary/85 transition-all"
                >
                  <span>Request Custom Calibration Matrix</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
