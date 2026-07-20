'use client';

import { useState } from 'react';

import { Reveal, RevealItem } from '@/components/Reveal';
import { products, Product } from '@/lib/data';
import Link from 'next/link';
import { 
  DoorClosed, Box, Wind, Cpu, Gauge, Thermometer, Activity, 
  ArrowRight, ArrowLeft, ShieldCheck, HelpCircle, 
  CheckCircle, Play, Settings, CheckCircle2, ChevronRight, Clock 
} from 'lucide-react';

const iconMap = {
  DoorClosed: DoorClosed,
  Box: Box,
  Wind: Wind,
  Cpu: Cpu,
  Gauge: Gauge,
  Thermometer: Thermometer,
  Activity: Activity,
  Clock: Clock,
  Settings: Settings
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeStep, setActiveStep] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const IconComponent = iconMap[product.iconName] || Cpu;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(Math.floor(1000 + Math.random() * 9000));
    setInquirySent(true);
  };

  // Find related products
  const relatedList = products.filter((p) => product.related.includes(p.id));

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* Grid backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bp-grid" />
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none scan-line w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-[15%] left-[-10%] bg-glow-breathe-1" />
      <div className="absolute bottom-[20%] right-[-10%] bg-glow-breathe-2" />

      {/* Page Header & Hero */}
      <section className="relative pt-36 pb-20 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Back button */}
          <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Products</span>
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 items-start">
            {/* Left Col: Info */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {product.tag}
                    </span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-5xl leading-none">
                    {product.title}
                  </h1>
                </RevealItem>
                <RevealItem>
                  <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                    {product.longOverview}
                  </p>
                </RevealItem>
              </Reveal>

              {/* Quick Specs summary */}
              <Reveal className="border-y border-border/60 py-6 grid grid-cols-2 gap-4">
                {product.specs[0]?.items.slice(0, 4).map((spec, idx) => (
                  <RevealItem key={idx} className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{spec.label}</span>
                    <span className="text-sm font-semibold text-foreground mt-1">{spec.value}</span>
                  </RevealItem>
                ))}
              </Reveal>

              {/* Action buttons */}
              <Reveal className="flex flex-wrap gap-4 pt-2">
                <RevealItem>
                  <a
                    href="#wiring-inquiry"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20"
                  >
                    Request Wiring Plan
                  </a>
                </RevealItem>

              </Reveal>
            </div>

            {/* Right Col: High-tech Schematics Showcase */}
            <div className="lg:col-span-5 relative rounded-2xl border border-primary/20 bg-card/40 p-8 backdrop-blur-md overflow-hidden bp-grid-fine flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />

              {/* Central Dynamic Schematic Graphic */}
              <div className="h-60 w-60 rounded-full border-2 border-dashed border-primary/20 p-6 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
                <IconComponent className="h-24 w-24 text-primary animate-pulse" />
                
                {/* Orbital nodes */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">IN</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">OUT</div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 bg-card text-[8px] font-mono text-primary font-bold">MCU</div>
              </div>

              <div className="w-full mt-10 text-center font-mono text-[10px] text-muted-foreground">
                <p>32-BIT DETERMINISTIC ARM MICROCONTROLLER CORE</p>
                <p className="text-primary/70 mt-1">NABL TRACEABLE ACCURACY LABS APPROVED</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications & Features Section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Applications */}
            <div>
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Deployment</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Cleanroom Environments</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Designed to integrate into high-specification environments, meeting the rigid requirements of cleanliness, pressure isolation, and continuous operation.
                  </p>
                </RevealItem>
              </Reveal>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {product.applications.map((app, idx) => (
                  <div key={idx} className="flex gap-3 rounded-xl border border-border/60 bg-card/25 p-4 backdrop-blur-sm">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{app}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Fully validated placement.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Features */}
            <div>
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Capability</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Engineering Excellence</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Precision hardware matched with advanced firmware loops. These features protect zones from pressure failure or overlap entry risks.
                  </p>
                </RevealItem>
              </Reveal>

              <ul className="mt-8 space-y-4">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-xl border border-border/40 bg-secondary/5 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-xs text-accent">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-foreground/90 font-medium leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Working Principle Section (Interactive Simulator) */}
      <section className="relative py-24 border-t border-border/60 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Logic Loops</span>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Working Principle</h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-sm text-muted-foreground">
                Understand the sub-millisecond sequencing of commands that run inside the ARM core processor. Click each step below to simulate execution.
              </p>
            </RevealItem>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
            {/* Steps Column */}
            <div className="lg:col-span-6 space-y-3">
              {product.workingPrinciple.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-300 ${
                    activeStep === idx
                      ? 'border-primary/40 bg-primary/[0.03] shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]'
                      : 'border-border/60 bg-transparent hover:bg-secondary/15'
                  }`}
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold ${
                    activeStep === idx ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                  }`}>
                    {step.step}
                  </span>
                  <div>
                    <h4 className={`text-sm font-bold ${activeStep === idx ? 'text-primary' : 'text-foreground'}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Simulated logic flow visualizer */}
            <div className="lg:col-span-6 rounded-2xl border border-border bg-card/25 p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] bp-grid-fine">

              {/* Dynamic SVG Schematic path change */}
              <div className="w-full max-w-sm h-48 border border-border/85 rounded-xl bg-secondary/5 relative flex items-center justify-center p-6">
                <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 200 100">
                  {/* Grid Lines */}
                  <line x1="20" y1="50" x2="180" y2="50" strokeDasharray="3,3" />
                  <line x1="100" y1="20" x2="100" y2="80" strokeDasharray="3,3" />

                  {/* Flow path lines */}
                  <path 
                    d="M 20 50 L 100 50 M 100 50 L 180 50" 
                    className={activeStep > 0 ? "stroke-primary stroke-2" : ""}
                  />
                  <path 
                    d="M 100 50 L 100 20 L 150 20" 
                    className={activeStep > 1 ? "stroke-accent stroke-2" : ""}
                  />

                  {/* Interlocking logic circles */}
                  <circle cx="20" cy="50" r="8" className={activeStep === 0 ? "fill-primary/20 stroke-primary stroke-2 animate-pulse" : "fill-card stroke-border"} />
                  <circle cx="100" cy="50" r="12" className={activeStep === 1 || activeStep === 2 ? "fill-accent/20 stroke-accent stroke-2 animate-pulse" : "fill-card stroke-border"} />
                  <circle cx="180" cy="50" r="8" className={activeStep === 3 ? "fill-primary/20 stroke-primary stroke-2 animate-pulse" : "fill-card stroke-border"} />

                  <circle cx="150" cy="20" r="6" className={activeStep === 2 ? "fill-accent/40 stroke-accent animate-ping" : "fill-card stroke-border"} />

                  {/* Text markers */}
                  <text x="12" y="36" className="fill-foreground font-mono text-[7px]" stroke="none">REQUEST</text>
                  <text x="92" y="34" className="fill-foreground font-mono text-[7px]" stroke="none">GATE</text>
                  <text x="172" y="36" className="fill-foreground font-mono text-[7px]" stroke="none">SECURE</text>
                </svg>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl mb-12">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Datasheet</span>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Technical Specifications</h2>
            </RevealItem>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {product.specs.map((specCategory, idx) => (
              <div key={idx} className="rounded-2xl border border-border/80 bg-card/40 p-6 backdrop-blur-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary border-b border-border/50 pb-3">
                  {specCategory.category}
                </h3>
                <div className="mt-4 space-y-3.5">
                  {specCategory.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex justify-between items-start gap-4 text-xs">
                      <span className="text-muted-foreground font-medium">{item.label}</span>
                      <span className="text-foreground font-semibold text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* FAQs Section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Support</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">Product FAQ</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Have questions about electrical ratings, installation codes, or system diagnostics? Read our tech support responses.
                  </p>
                </RevealItem>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card/30 overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-4.5 text-left font-semibold text-sm hover:bg-secondary/15 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-primary text-lg">{faqOpen === idx ? '−' : '+'}</span>
                  </button>
                  {faqOpen === idx && (
                    <div className="px-6 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40 bg-secondary/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedList.length > 0 && (
        <section className="relative py-24 border-t border-border/60 z-10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-10 flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '8s' }} />
              <span>Related Control Modules</span>
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedList.map((rel) => {
                const RelIcon = iconMap[rel.iconName] || Cpu;
                return (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.id}`}
                    className="group rounded-xl border border-border bg-card/20 p-6 hover:border-primary/20 hover:bg-secondary/5 transition-all duration-300"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <RelIcon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {rel.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center text-xs font-semibold text-foreground">
                      Details
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-primary" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Call To Action Form Section */}
      <section id="wiring-inquiry" className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-2xl border border-primary/20 bg-card/50 p-8 md:p-12 relative overflow-hidden backdrop-blur-md bp-grid-fine">
            <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Technical Blueprint Enquiry
              </h2>
              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Connect with our senior cleanroom design architects to receive exact wiring maps, integration diagrams, and customized system setups.
              </p>
            </div>

            <div className="mt-10 border-t border-border/50 pt-8">
              {inquirySent ? (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center flex flex-col items-center">
                  <CheckCircle2 className="h-12 w-12 text-primary animate-pulse" />
                  <h3 className="mt-4 text-lg font-bold text-foreground">Enquiry Dispatched Successfully</h3>
                  <p className="mt-2 text-xs text-muted-foreground max-w-sm">
                    Our technical support desk has assigned ticket ID <code className="text-primary">TR-#{ticketId}</code>. An engineer will follow up within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="neumorphic-container">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Full Name</label>
                      <input required type="text" className="neumorphic-input" placeholder="Enter name" />
                    </div>
                    <div className="neumorphic-container">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Corporate Email</label>
                      <input required type="email" className="neumorphic-input" placeholder="name@company.com" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="neumorphic-container">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Project Scope / Cleanroom Grade</label>
                      <select className="neumorphic-input select-theme bg-card">
                        <option>Class A (ISO 5) Sterile Core</option>
                        <option>Class B (ISO 6) Airlock Zone</option>
                        <option>Class C (ISO 7) Preparation</option>
                        <option>Class D (ISO 8) Gowning Room</option>
                        <option>Non-Cleanroom Industrial Zone</option>
                      </select>
                    </div>
                    <div className="neumorphic-container">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Required System Quantity</label>
                      <input type="number" min="1" defaultValue="5" className="neumorphic-input" />
                    </div>
                  </div>

                  <div className="neumorphic-container">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground pl-1">Technical Integration Details / Comments</label>
                    <textarea className="neumorphic-textarea" placeholder="Provide details of existing fire panel overrides, biometrics integrations, or sensor setups..."></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex h-12 items-center justify-center gap-2 rounded-lg bg-primary text-xs font-semibold text-primary-foreground btn-premium"
                  >
                    <span>Request Technical Architect Review</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
