'use client';

import { useState } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import { resourceDownloads, generalFAQs } from '@/lib/data';
import Link from 'next/link';
import {
  Download, Search, HelpCircle,
  ShieldCheck, X
} from 'lucide-react';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Datasheet' | 'Manual' | 'Drawing' | 'Certificate'>('All');
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(null);

  const filteredDownloads = resourceDownloads.filter((dl) => {
    const matchesSearch = dl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dl.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || dl.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalResults = filteredDownloads.length;

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
            <span className="text-primary">Resource Library</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Technical library</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Technical Sheets & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Documentation</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Download verified wiring schematics, calibration sheets, datasheets, and user manuals, or read technical articles about cleanroom control protocols.
              </p>
            </RevealItem>
            <RevealItem>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/assets/docs/neural-company-brochure.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 sm:px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20 transition-all text-center"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Corporate Brochure (PDF)</span>
                </a>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Search and Filters panel */}
      <section className="relative py-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 border-b border-border/60 pb-8">

            {/* Search Input Bar */}
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-primary animate-pulse" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources by model, parameter, or keyword..."
                className="h-12 w-full rounded-full border border-border/80 bg-card/40 pl-12 pr-10 text-sm outline-none focus:border-primary backdrop-blur-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1">
              {(['All', 'Datasheet', 'Manual', 'Drawing', 'Certificate'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 rounded-full px-4 sm:px-5 py-2.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider transition-all border ${activeFilter === filter
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                    }`}
                >
                  {filter === 'Drawing' ? 'CAD Drawings' : `${filter}s`}
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="text-xs text-muted-foreground font-mono">
              Found {totalResults} matching results in current index.
            </div>
          </div>
        </div>
      </section>

      {/* Resources grid list */}
      <section className="relative pb-24 pt-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {activeFilter === 'Datasheet' ? (
            <div className="text-center py-16 border border-dashed border-border/80 rounded-2xl bg-secondary/5 px-6 max-w-xl mx-auto flex flex-col items-center">
              <HelpCircle className="h-10 w-10 text-primary/70 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-foreground">Technical Datasheets & Specifications</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Detailed technical datasheets and model parameter specifications are shared directly upon formal engineering enquiry.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-xs font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20 transition-all"
              >
                Datasheets will be shared upon enquiry
              </Link>
            </div>
          ) : activeFilter === 'Drawing' ? (
            <div className="text-center py-16 border border-dashed border-border/80 rounded-2xl bg-secondary/5 px-6 max-w-xl mx-auto flex flex-col items-center">
              <HelpCircle className="h-10 w-10 text-primary/70 mb-4 animate-pulse" />
              <h3 className="text-lg font-bold text-foreground">CAD Drawings & Panel Schematics</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Project-specific 2D/3D CAD drawings and panel cutout dimensions are shared directly upon formal engineering enquiry.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-xs font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20 transition-all"
              >
                CAD drawings will be shared upon enquiry
              </Link>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl bg-secondary/5">
              <HelpCircle className="h-10 w-10 text-muted-foreground/60 mx-auto animate-bounce" />
              <h3 className="mt-4 text-sm font-bold text-foreground">No resources found</h3>
              <p className="mt-1 text-xs text-muted-foreground">Try adjusting your filters or query to find the manuals.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Render matching downloads */}
              {filteredDownloads.map((dl, idx) => (
                <div
                  key={idx}
                  className="group rounded-xl border border-border bg-card/25 p-5 hover:border-primary/20 hover:bg-secondary/15 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                        {dl.category}
                      </span>
                      <span className="text-[9px] font-mono text-muted-foreground/60">{dl.format}</span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {dl.title}
                    </h3>
                  </div>

                  <a
                    href={dl.filename.startsWith('/') ? dl.filename : `/assets/docs/${dl.filename}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex h-11 min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-secondary/30 hover:bg-primary hover:text-primary-foreground border border-border transition-all text-xs font-semibold text-foreground w-full"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>{dl.category === 'Certificate' ? 'Download Certificate' : 'Download Manual'}</span>
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* General FAQs Accordion Section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12">

            {/* Left Col */}
            <div className="lg:col-span-5">
              <Reveal>
                <RevealItem>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/40" />
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">Support Base</span>
                  </div>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight">General & Validation FAQs</h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    Read generic answers about compliance verification certificates, calibration guidelines, delivery schedules, and warranty extensions.
                  </p>
                </RevealItem>
              </Reveal>
            </div>

            {/* Right Col Accordions */}
            <div className="lg:col-span-7 space-y-4">
              {generalFAQs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card/30 overflow-hidden">
                  <button
                    onClick={() => setFaqOpenIdx(faqOpenIdx === idx ? null : idx)}
                    className="w-full flex justify-between items-center px-5 sm:px-6 py-4 min-h-[44px] text-left font-semibold text-sm hover:bg-secondary/15 transition-colors gap-3"
                  >
                    <span>{faq.q}</span>
                    <span className="text-primary text-lg shrink-0">{faqOpenIdx === idx ? '−' : '+'}</span>
                  </button>
                  {faqOpenIdx === idx && (
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

      {/* Support CTA */}
      <section className="relative border-t border-border/60 py-24 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <Reveal className="max-w-2xl mx-auto flex flex-col items-center">
            <RevealItem>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Need Specific Validation Documents?
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                We generate customized FAT, SAT, DQ, IQ, and OQ validation protocols matching specific installation parameters for your facility audits.
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-xs font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20"
              >
                Request DQ/IQ/OQ Templates
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
