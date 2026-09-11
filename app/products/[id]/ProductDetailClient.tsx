'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Reveal, RevealItem } from '@/components/Reveal';
import { products, Product } from '@/lib/data';
import Link from 'next/link';
import { 
  DoorClosed, Box, Wind, Cpu, Gauge, Thermometer, Activity, 
  ArrowRight, ArrowLeft, ShieldCheck, HelpCircle, 
  CheckCircle, Play, Settings, CheckCircle2, ChevronRight, Clock,
  ZoomIn, ChevronLeft, Download, FileText
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
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const IconComponent = iconMap[product.iconName] || Cpu;
  const photos = product.photos ?? [];
  const hasPhotos = photos.length > 0;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketId(Math.floor(1000 + Math.random() * 9000));
    setInquirySent(true);
  };

  const handleCatalogRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('wiring-inquiry');
    if (target) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
            <div className={hasPhotos ? 'lg:col-span-7 space-y-6' : 'lg:col-span-12 max-w-4xl space-y-6'}>
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {product.tag}
                    </span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h1 className="mt-4 text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                    {product.title}
                  </h1>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
                    {product.longOverview}
                  </p>
                </RevealItem>
              </Reveal>

              {/* Quick Specs summary */}
              <Reveal className="border-y border-border/60 py-5 sm:py-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {product.specs[0]?.items.slice(0, 4).map((spec, idx) => (
                  <RevealItem key={idx} className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{spec.label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground mt-1">{spec.value}</span>
                  </RevealItem>
                ))}
              </Reveal>

              {/* Action buttons */}
              <Reveal className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <RevealItem className="w-full sm:w-auto">
                  <a
                    href="#wiring-inquiry"
                    onClick={handleCatalogRequest}
                    className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20 text-center active:scale-95 transition-all"
                  >
                    <span>Request Product Catalog & Inquiry</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                </RevealItem>
                {product.downloads && product.downloads.some(d => d.requestCatalog || !d.filename) ? (
                  <RevealItem className="w-full sm:w-auto">
                    <a
                      href="#wiring-inquiry"
                      onClick={handleCatalogRequest}
                      className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-primary/40 bg-card/60 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-foreground hover:bg-secondary/40 hover:border-primary transition-all shadow-md backdrop-blur-sm text-center active:scale-95"
                    >
                      <FileText className="h-4 w-4 text-primary shrink-0" />
                      <span>Request Full Specification Sheet</span>
                    </a>
                  </RevealItem>
                ) : product.downloads && product.downloads.length > 0 && product.downloads[0].filename ? (
                  <RevealItem className="w-full sm:w-auto">
                    <a
                      href={product.downloads[0].filename}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-primary/40 bg-card/60 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-foreground hover:bg-secondary/40 hover:border-primary transition-all shadow-md backdrop-blur-sm text-center active:scale-95"
                    >
                      <Download className="h-4 w-4 text-primary shrink-0" />
                      <span>Download Manual (PDF)</span>
                    </a>
                  </RevealItem>
                ) : null}
              </Reveal>
            </div>

            {/* Right Col: Product Photo Showcase (Only rendered when photos exist) */}
            {hasPhotos && (
              <div className="lg:col-span-5 relative">
                <div className="space-y-3">
                  {/* Main photo — click to open lightbox */}
                  <div
                    className="relative rounded-2xl overflow-hidden border border-primary/20 bg-card/40 aspect-[4/3] cursor-zoom-in group"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <Image
                      key={photos[activePhoto].src}
                      src={photos[activePhoto].src}
                      alt={photos[activePhoto].alt}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                    {/* Zoom hint */}
                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 border border-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="h-4 w-4 text-primary" />
                    </div>
                    {/* Photo counter badge */}
                    <div className="absolute bottom-3 right-3 rounded-full bg-background/70 backdrop-blur-sm border border-border/50 px-2.5 py-1 text-[10px] font-mono text-muted-foreground">
                      {activePhoto + 1} / {photos.length}
                    </div>
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59,130,246,0.015) 2px, rgba(59,130,246,0.015) 4px)' }} />
                  </div>

                  {/* Thumbnail strip — clicking thumbnail switches active photo preview */}
                  <div className="flex gap-2 overflow-x-auto pb-1 max-w-full scrollbar-thin">
                    {photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhoto(idx)}
                        className={`relative w-20 h-20 shrink-0 aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          activePhoto === idx
                            ? 'border-primary shadow-[0_0_12px_rgba(59,130,246,0.3)] ring-2 ring-primary/30'
                            : 'border-border/40 hover:border-primary/60 opacity-70 hover:opacity-100'
                        }`}
                        title={photo.alt}
                      >
                        <Image
                          key={photo.src}
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="80px"
                        />
                        {activePhoto === idx && (
                          <div className="absolute inset-0 bg-primary/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && hasPhotos && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button — top right */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/80 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors z-10"
            aria-label="Close"
          >
            <span style={{ fontSize: '18px', lineHeight: 1 }}>✕</span>
          </button>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); setActivePhoto((p) => (p - 1 + photos.length) % photos.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/80 hover:border-primary/40 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); setActivePhoto((p) => (p + 1) % photos.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-card/80 hover:border-primary/40 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Main image container */}
          <div
            className="flex flex-col items-center gap-4 w-full max-w-5xl px-3 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Large image */}
            <div className="relative w-full rounded-xl overflow-hidden border border-primary/20 shadow-2xl" style={{ maxHeight: '70vh', aspectRatio: '16/10' }}>
              <Image
                key={photos[activePhoto].src}
                src={photos[activePhoto].src}
                alt={photos[activePhoto].alt}
                fill
                unoptimized
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Caption + counter */}
            <p className="text-center text-xs text-muted-foreground font-mono">
              {photos[activePhoto].alt}&nbsp;&nbsp;·&nbsp;&nbsp;{activePhoto + 1} / {photos.length}
            </p>

            {/* Thumbnail strip inside lightbox */}
            <div className="flex justify-center gap-2 flex-wrap max-w-full overflow-x-auto py-1">
              {photos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhoto(idx)}
                  className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    activePhoto === idx
                      ? 'border-primary shadow-[0_0_10px_rgba(59,130,246,0.4)] ring-2 ring-primary/40'
                      : 'border-border/40 hover:border-primary/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}


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

      {/* Working Principle Section — only shown when steps exist */}
      {product.workingPrinciple.length > 0 && (
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
      )}

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

          {/* Product Downloads / Manuals Section */}
          {product.downloads && product.downloads.length > 0 && (
            <div className="mt-12 border-t border-border/50 pt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>Product Manuals & Specifications</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.downloads.map((dl, idx) => (
                  dl.requestCatalog || !dl.filename ? (
                    <a
                      key={idx}
                      href="#wiring-inquiry"
                      onClick={handleCatalogRequest}
                      className="flex items-center justify-between rounded-xl border border-primary/40 bg-primary/5 p-4 hover:border-primary hover:bg-primary/10 transition-all backdrop-blur-sm group cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          <span>{dl.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 block font-mono">{dl.type} · {dl.size}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <a
                      key={idx}
                      href={dl.filename}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-border/80 bg-card/40 p-4 hover:border-primary/40 hover:bg-secondary/20 transition-all backdrop-blur-sm group"
                    >
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                          <span>{dl.name}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 block font-mono">{dl.type} · {dl.size}</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </section>



      {/* FAQs Section — only shown when FAQs exist */}
      {product.faqs.length > 0 && (
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
      )}

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
