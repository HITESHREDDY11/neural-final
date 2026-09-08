'use client';

import { useState } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import { timelineEvents } from '@/lib/data';
import Link from 'next/link';
import { 
  History, Eye, Heart, ShieldCheck, Milestone, Users, Award, 
  Settings, CheckCircle2, ChevronRight, Rocket, TrendingUp, Lightbulb, Target, Flag 
} from 'lucide-react';

const timelineIconMap: Record<string, any> = {
  Rocket,
  TrendingUp,
  Lightbulb,
  Target,
  Flag
};

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
  { name: 'Dr. Ramesh Kumar', role: 'Lead Calibration Scientist', dept: 'Calibration Labs', bio: 'Calibration scientist specializing in ultra-low range differential pressure and gas humidity calibration loops.' },
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
                Established in 2019, Neural Industrial Automation has grown from a specialized engineering firm into a premier cleanroom automation partner trusted across leading pharmaceutical facilities and technology laboratories.
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

      {/* Interactive Timeline Section - OUR JOURNEY */}
      <section className="relative py-24 border-t border-border/60 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          
          {/* Section Header */}
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <RevealItem>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                OUR JOURNEY
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Driving innovation <span className="text-primary font-normal">•</span> Delivering impact <span className="text-primary font-normal">•</span> Building the future.
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Trace our roadmap from foundation and custom cleanroom controls to global telemetry architectures and advanced systems integration.
              </p>
            </RevealItem>
          </Reveal>

          {/* Timeline 5-Column Stepper Layout */}
          <div className="relative">
            {/* Horizontal Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[88px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {timelineEvents.map((evt) => {
                const IconComp = timelineIconMap[evt.icon] || Milestone;
                const isSelected = activeYear === evt.year;

                return (
                  <div
                    key={evt.year}
                    onClick={() => setActiveYear(evt.year)}
                    className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? 'border-primary/80 bg-primary/10 shadow-[0_0_25px_-5px_rgba(59,130,246,0.3)] ring-1 ring-primary/50'
                        : 'border-border/70 bg-card/40 hover:border-primary/50 hover:bg-card/70'
                    }`}
                  >
                    <div>
                      {/* Node Circle Header */}
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300 ${
                            isSelected
                              ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-110'
                              : 'border-primary/40 bg-secondary/50 text-primary group-hover:border-primary group-hover:scale-105'
                          }`}
                        >
                          <IconComp className="h-6 w-6" />
                        </div>

                        {/* Year Banner */}
                        <div className="text-3xl font-black tracking-tight text-primary font-mono">
                          {evt.year}
                        </div>

                        {/* Phase Title */}
                        <div className="mt-1 text-xs font-extrabold uppercase tracking-wider text-foreground">
                          {evt.title}
                        </div>

                        {/* Subtitle */}
                        <div className="text-[11px] font-medium text-muted-foreground/80 mt-0.5 mb-4">
                          {evt.subtitle}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-px bg-border/60 my-3" />

                      {/* Bullet points */}
                      <ul className="space-y-3 mt-4 text-xs text-muted-foreground leading-relaxed">
                        {evt.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
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
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    End-to-end industrial automation solutions including design, engineering, programming, panel manufacturing, commissioning, and support services.
                  </p>
                </RevealItem>
                <RevealItem>
                  {/* Official Siemens System Integrator Authorization Badge Block */}
                  <div className="mt-6 w-full max-w-md rounded-xl border border-border/60 p-2 bg-secondary/30 backdrop-blur-md shadow-xl overflow-hidden">
                    <div className="relative p-4 sm:p-5 rounded-lg bg-[#efefe8] overflow-hidden border border-black/10">
                      
                      {/* Faint repeating official watermark background */}
                      <div className="absolute inset-0 opacity-[0.06] pointer-events-none select-none overflow-hidden font-mono text-[8px] text-black leading-relaxed tracking-wider py-1 px-1 whitespace-nowrap">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="-rotate-1 my-0.5">
                            M/s. Neural Industrial Automation Pvt. Ltd. &nbsp;&nbsp;&nbsp;&nbsp; M/s. Neural Industrial Automation Pvt. Ltd. &nbsp;&nbsp;&nbsp;&nbsp; M/s. Neural Industrial Automation Pvt. Ltd.
                          </div>
                        ))}
                      </div>

                      {/* Official Authorization Badge Grid (Matching Heights & Proportions) */}
                      <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 items-stretch">
                        
                        {/* Official Authorization Badge Block 1 (Left: Authorized System Integrator) */}
                        <div className="bg-[#dcdcd4] p-4 sm:p-5 rounded-sm text-left shadow-sm flex flex-col justify-between border border-black/5 min-h-[120px] sm:min-h-[140px]">
                          <div className="text-xs sm:text-sm font-extrabold tracking-tight text-[#1a1a1a] leading-tight font-sans">
                            Authorized<br />
                            System<br />
                            Integrator
                          </div>
                          <div className="mt-3 text-[10px] sm:text-xs font-semibold text-[#404040] leading-snug font-sans">
                            Industrial<br />
                            Automation &<br />
                            Communication
                          </div>
                        </div>

                        {/* Official Authorization Badge Block 2 (Right: SIEMENS) */}
                        <div className="bg-[#e5e5de] p-4 sm:p-5 rounded-sm flex items-center justify-center shadow-sm border border-black/5 min-h-[120px] sm:min-h-[140px]">
                          <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-[0.18em] text-[#111111] font-sans text-center">
                            SIEMENS
                          </span>
                        </div>

                      </div>

                    </div>
                  </div>
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
                  'Cleanroom Parameter Validation Compatibility',
                  '100% Traceable Calibration Certificates'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground/80 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Stat callout inside card */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-6">
                <div>
                  <div className="text-2xl font-black text-primary">ISO 9001</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Quality Standard</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-accent">CE</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Certified Standard</div>
                </div>
              </div>
            </div>

            {/* Quality Seals icons */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'ISO 9001', val: '2015 Cert' },
                { title: 'CE Compliant', val: 'EMC Shielded' }
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
