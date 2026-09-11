'use client';

import { useState } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import Link from 'next/link';
import {
  Factory, ShieldCheck, Cpu, ClipboardCheck, Settings,
  ThermometerSnowflake, Zap, Activity, Info, Award
} from 'lucide-react';

interface Zone {
  id: number;
  name: string;
  machinery: string;
  details: string;
  checks: string[];
  x: string;
  y: string;
  w: string;
  h: string;
}

const zones: Zone[] = [
  {
    id: 1,
    name: 'SMT Pick-and-Place Assembly',
    machinery: 'High-speed automated SMT line with optical alignment cameras.',
    details: 'This zone runs high-precision component placement on multi-layer PCBs. Diodes, ARM microcontrollers, and crystal oscillators are automatically placed and soldered via reflow ovens.',
    checks: ['100% Automatic Optical Inspection (AOI)', 'Solder paste height verification', 'Component alignment validation'],
    x: '5%', y: '10%', w: '40%', h: '35%'
  },
  {
    id: 2,
    name: 'Manual Looming & Integration',
    machinery: 'Static-free ESD workstations and precision crimping rigs.',
    details: 'Engineers integrate PCB modules into flame-retardant enclosures, wire relays to terminal ports, and secure stainless steel bezels for flush-mount indicators.',
    checks: ['Wiring continuity inspection', 'Crimping pull tests', 'ESD earth ground verification'],
    x: '50%', y: '10%', w: '45%', h: '35%'
  },
  {
    id: 3,
    name: 'Calibration Chamber',
    machinery: 'Traceable environmental calibration chambers and digital DP calibrators.',
    details: 'DP Indicators and Temp & RH transmitters undergo multi-point digital calibration. Reference values are matched against standards to generate lookup tables stored in firmware.',
    checks: ['Zero-point digital calibration', 'Standard calibration comparison', 'Linearity deviation tracking'],
    x: '5%', y: '55%', w: '30%', h: '35%'
  },
  {
    id: 4,
    name: 'Thermal Aging & Burn-In',
    machinery: 'Programmable heat chambers running at 50°C.',
    details: 'Every controller undergoes a 48-hour continuous thermal burn-in stress test. This thermal loading filters out early component failure rates, guaranteeing field reliability.',
    checks: ['48-hour thermal load loops', 'Continuous telemetry data logging', 'On-load relay switching checks'],
    x: '40%', y: '55%', w: '30%', h: '35%'
  },
  {
    id: 5,
    name: 'QA Final Dispatch Inspection',
    machinery: 'Digital electrical safety testers and validation benches.',
    details: 'Final quality audits verify physical parameters, cleanroom compliance seals, and correct terminal outputs. Calibration certificates are generated and packed.',
    checks: ['Dielectric breakdown voltage check', 'Bezel mechanical seal inspection', 'Certificate match verification'],
    x: '75%', y: '55%', w: '20%', h: '35%'
  }
];

export default function ManufacturingPage() {
  const [activeZoneId, setActiveZoneId] = useState(1);
  const activeZone = zones.find(z => z.id === activeZoneId) || zones[0];

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* Blueprint grid background */}
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
            <span className="text-primary">Manufacturing</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Production Operations</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Precision Factory & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Calibration</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                We manufacture all hardware in-house inside our static-free, certified facilities. Every controller, interlocking panel, and transmitter is audited against rigid testing guidelines.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Interactive Factory Layout */}
      <section className="relative pb-24 pt-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-start">

            {/* Left: SVG factory floor plan */}
            <div className="lg:col-span-7 rounded-2xl border border-primary/20 bg-card/30 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden bp-grid-fine">
              {/* Layout SVG Canvas */}
              <div className="relative aspect-[4/3] w-full min-h-[260px] sm:min-h-[340px] border border-border/60 bg-secondary/5 rounded-xl overflow-hidden">
                <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 400 300">
                  {/* Outer boundaries */}
                  <rect x="10" y="10" width="380" height="280" rx="4" />
                  <line x1="200" y1="10" x2="200" y2="150" strokeDasharray="3,3" />
                  <line x1="10" y1="150" x2="390" y2="150" strokeDasharray="3,3" />
                  <line x1="150" y1="150" x2="150" y2="290" strokeDasharray="3,3" />
                  <line x1="280" y1="150" x2="280" y2="290" strokeDasharray="3,3" />

                  {/* Room labels */}
                  <text x="25" y="25" className="fill-muted-foreground text-[8px] font-medium" stroke="none">SMT Assembly</text>
                  <text x="215" y="25" className="fill-muted-foreground text-[8px] font-medium" stroke="none">Manual Integration</text>
                  <text x="25" y="165" className="fill-muted-foreground text-[8px] font-medium" stroke="none">Calibration Lab</text>
                  <text x="165" y="165" className="fill-muted-foreground text-[8px] font-medium" stroke="none">Thermal Burn-In</text>
                  <text x="295" y="165" className="fill-muted-foreground text-[8px] font-medium" stroke="none">QA & Dispatch</text>
                </svg>

                {/* Hotspot boxes overlays */}
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneId(zone.id)}
                    aria-label={`Select Factory Zone ${zone.id}: ${zone.name}`}
                    className={`absolute rounded-lg border transition-all duration-300 flex items-center justify-center font-bold text-xs ${activeZoneId === zone.id
                      ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(59,130,246,0.25)] text-primary'
                      : 'border-transparent bg-transparent hover:bg-secondary/10 text-muted-foreground/60'
                      }`}
                    style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
                  >
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="flex h-6 w-6 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-card border border-border/80 text-[11px] sm:text-[10px] font-mono text-foreground font-bold shadow-sm">
                        {zone.id}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Zone selector pills for mobile touch */}
              <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 sm:hidden">
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setActiveZoneId(zone.id)}
                    className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold min-h-[44px] border transition-colors ${
                      activeZoneId === zone.id
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border/60 bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
                    }`}
                  >
                    Zone 0{zone.id}: {zone.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Selected Zone Details Console */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-border/80 bg-card/45 p-5 sm:p-6 min-h-[360px] sm:min-h-[400px] flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary mb-4">
                  <Info className="h-4.5 w-4.5 text-primary animate-pulse" />
                  <span>Factory Zone 0{activeZone.id}</span>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-foreground">{activeZone.name}</h3>

                <div className="mt-4 border-t border-border/40 pt-4">
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase font-semibold">Associated Machinery</span>
                  <p className="text-xs font-semibold text-foreground/90 mt-1 leading-relaxed">{activeZone.machinery}</p>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase font-semibold">Process Description</span>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{activeZone.details}</p>
                </div>

                <div className="mt-6 border-t border-border/40 pt-5 flex-grow">
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase font-semibold mb-3">Quality Checks Enforced</span>
                  <div className="space-y-2">
                    {activeZone.checks.map((check, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                        <span>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Burn-in & Testing specs section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">

            {/* Text description */}
            <div>
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Reliability</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Environmental stress Testing</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Industrial environments are prone to power line drops, static buildup, and chemical vaporizations. We run continuous stress testing to pre-audit every sensor and logic controller.
                  </p>
                </RevealItem>
              </Reveal>

              <div className="mt-8 space-y-6">
                {[
                  { icon: ThermometerSnowflake, title: '48hr Thermal Aging Chamber', desc: 'Hardware runs at 50°C inside testing oven to accelerate and detect semiconductor latent failures.' },
                  { icon: Zap, title: '2kV Surge & ESD Testing', desc: 'PCB lines are subjected to multi-stage current surges to certify EMI/EMC TVS diode clamping performance.' },
                  { icon: Activity, title: 'Closed Loop Emulation', desc: 'Controllers are hooked to software logic rigs simulating thousands of open/close cycles before dispatch.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Seals icons */}
            <div className="rounded-2xl border border-primary/20 bg-card/40 p-8 backdrop-blur-md relative overflow-hidden bp-grid-fine flex flex-col items-center justify-center text-center">
              <Award className="h-10 w-10 text-accent animate-pulse" />
              <h3 className="text-xl font-bold mt-4">NABL Standard Calibrations</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-sm">
                Each DP indicator and humidity transmitter is validated using high-accuracy calibration rigs trace-mapped to international standards. Lookup tables are burned into controller EEPROM to retain linearity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
                {['CE Certified', 'ISO 9001:2015'].map((cert) => (
                  <span key={cert} className="rounded-full border border-border bg-secondary/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
