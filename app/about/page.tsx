'use client';

import { useState } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import { timelineEvents } from '@/lib/data';
import Link from 'next/link';
import { 
  History, Eye, Heart, ShieldCheck, Milestone, Users, Award, 
  Settings, CheckCircle2, ChevronRight 
} from 'lucide-react';

const values = [
  {
    icon: History,
    title: 'Precision Engineering',
    desc: 'We operate under the philosophy that cleanroom parameters leave no room for variance. Our sensors and logic loops are built to tolerate zero discrepancies.'
  },
  {
    icon: Eye,
    title: 'Continuous Innovation',
    desc: 'From custom firmware architectures to edge telemetry integrations, we constantly upgrade our hardware stacks to remain state of the art.'
  },
  {
    icon: Heart,
    title: 'Client Validation',
    desc: 'We co-develop solutions directly with cleanroom architects, ensuring our products slide seamlessly into commissioning protocols.'
  }
];

const leaders = [
  { name: 'K. Srinivasan', role: 'Head of Embedded Systems', dept: 'R&D', bio: 'Former aerospace controller architect with 15+ years experience in deterministic logic loop designs.' },
  { name: 'Dr. Ramesh Kumar', role: 'Lead Calibration Scientist', dept: 'Calibration Labs', bio: 'NABL assessor specializing in ultra-low range differential pressure and gas humidity calibration loops.' },
  { name: 'Sarah Ahmed', role: 'Quality Assurance Director', dept: 'QA & Auditing', bio: 'Cleanroom validation expert auditing operations to maintain strict ISO 9001 and CE compliance.' },
  { name: 'M. Anand Rao', role: 'Chief of Production Operations', dept: 'Manufacturing', bio: 'Supervising the SMT pick-and-place lines, testing loops, and thermal burn-in aging procedures.' }
];

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState('2019');

  const selectedEvent = timelineEvents.find(e => e.year === activeYear) || timelineEvents[0];

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* Blueprint grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bp-grid" />
      <div className="absolute inset-0 z-0 pointer-events-none scan-line w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-[15%] left-[-10%] bg-glow-breathe-1" />
      <div className="absolute bottom-[20%] right-[-10%] bg-glow-breathe-2" />


      {/* Hero Header */}
      <section className="relative pt-36 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">About Us</span>
          </div>

          <Reveal className="mt-8 max-w-3xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Company Story</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Redefining Cleanroom <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Precision</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Established in 2019, Neural Industrial Automation has grown from a specialized engineering firm into a premier cleanroom automation partner trusted by over 60+ pharmaceutical leaders and technology laboratories.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Vision & Core Values */}
      <section className="relative py-20 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Vision left box */}
            <div className="lg:col-span-4 rounded-2xl border border-primary/20 bg-card/40 p-8 backdrop-blur-md relative overflow-hidden bp-grid-fine">
              <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider">OUR MISSION & VISION</span>
              <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">Safe. Smart. Sustainable.</h3>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                To equip global enterprises with fail-safe automation hardware that protects personnel, ensures compliance audit success, and achieves sub-micron contamination containment.
              </p>
              <div className="mt-8 border-t border-border/50 pt-5">
                <div className="text-3xl font-extrabold text-primary">2019</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest mt-1">ESTABLISHED HYDERABAD</div>
              </div>
            </div>

            {/* Core Values right grid */}
            <div className="lg:col-span-8 grid gap-6 sm:grid-cols-3">
              {values.map((v, idx) => (
                <div key={idx} className="rounded-xl border border-border/80 bg-card/20 p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <v.icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="text-sm font-bold text-foreground mt-4">{v.title}</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="relative py-24 border-t border-border/60 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl mb-12">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Milestones</span>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Industrial Timeline</h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-sm text-muted-foreground">
                Trace our roadmap from custom prototyping to deploying multi-door interlocking loops globally.
              </p>
            </RevealItem>
          </Reveal>

          {/* Timeline Buttons */}
          <div className="flex justify-between items-center border-b border-border/60 pb-8 relative">
            {/* Horizontal line marker */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-border" />
            <div className="flex gap-4 sm:gap-8 z-10">
              {timelineEvents.map((e) => (
                <button
                  key={e.year}
                  onClick={() => setActiveYear(e.year)}
                  className={`relative pb-8 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeYear === e.year
                      ? 'text-primary scale-105'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>{e.year}</span>
                  {activeYear === e.year && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Detail Panel */}
          <div className="mt-10 rounded-2xl border border-border bg-secondary/5 p-8 relative overflow-hidden min-h-[160px] bp-grid-fine">
            <div className="flex items-center gap-3">
              <Milestone className="h-5 w-5 text-accent animate-pulse" />
              <h4 className="text-lg font-bold text-foreground">{selectedEvent.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-3xl">
              {selectedEvent.desc}
            </p>
          </div>
        </div>
      </section>



      {/* Siemens System Integrator Section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Column: Branding and Description */}
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Integration Partner</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    Industrial Control & Automation Solutions
                  </h2>
                </RevealItem>
                <RevealItem>
                  <div className="mt-5 inline-flex items-center gap-4 bg-primary/10 border border-primary/25 rounded-xl px-5 py-3 shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)]">
                    <span className="text-2xl font-mono tracking-widest text-primary font-extrabold">SIEMENS</span>
                    <span className="text-sm text-primary/40 font-light">|</span>
                    <span className="text-sm font-bold text-foreground uppercase tracking-wider">System Integrator</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    End-to-end industrial automation solutions including design, engineering, programming, panel manufacturing, commissioning, and support services.
                  </p>
                </RevealItem>

              </Reveal>
            </div>

            {/* Right Column: Solutions list under Mitsubishi & Schneider */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <RevealItem>
                  <h3 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                    Mitsubishi & Schneider Systems on Request
                  </h3>
                </RevealItem>
              </Reveal>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Core Solutions Card */}
                <div className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur-md relative overflow-hidden">
                  <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border/40">
                    Core Solutions
                  </h4>
                  <div className="space-y-3.5">
                    {[
                      'PLC-Based Automation Systems',
                      'HMI & SCADA Development',
                      'Building Management Systems (BMS)',
                      'Environmental Monitoring Systems (EMS)',
                      'AHU, HVAC Process & Utility Automation',
                      'Data Acquisition & Reporting Systems'
                    ].map((sol, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-foreground/90">{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialized Applications Card */}
                <div className="rounded-xl border border-border bg-card/40 p-6 backdrop-blur-md relative overflow-hidden">
                  <h4 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border/40">
                    Specialized Applications
                  </h4>
                  <div className="space-y-3.5">
                    {[
                      'AHU, Dehumidifier Control Systems',
                      'Laminar Air Flow Systems / Biosafety Cabinets',
                      'Mist/Water/Air Shower Systems',
                      'Pass Box Automation'
                    ].map((app, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-foreground/90">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance / Quality Seals */}
      <section className="relative py-24 border-t border-border/60 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Compliance</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Quality Assurance Standards</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Our manufacturing unit maintains compliance logs mapped directly to validation audit requirements.
                  </p>
                </RevealItem>
              </Reveal>

              <div className="mt-8 space-y-3">
                {[
                  'ISO 9001:2015 Manufacturing Quality Standards',
                  'CE Compliant EMI/EMC Circuit Protections',
                  'WHO GMP Cleanroom Parameter Validation Compatibility',
                  'NABL Traceable calibration instrumentation systems'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-foreground/80 font-medium">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Seals icons */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'ISO 9001', val: '2015 Cert' },
                { title: 'CE Compliant', val: 'EMC Shielded' },
                { title: 'NABL Calibration', val: '12 Month TDS' },
                { title: 'GMP Cleanroom', val: 'Grade A-D Compliant' }
              ].map((c, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-secondary/15 p-6 text-center">
                  <Award className="h-6 w-6 text-primary mx-auto" />
                  <h4 className="mt-3 text-sm font-bold text-foreground">{c.title}</h4>
                  <p className="text-[10px] text-muted-foreground font-mono mt-1">{c.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
