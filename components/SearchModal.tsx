'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, ShieldAlert, Cpu, FileText, LayoutTemplate, HelpCircle } from 'lucide-react';
import { products, industries, solutions, resourceDownloads, techArticles } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  category: string;
  href: string;
  description?: string;
  icon: any;
}

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered: SearchResult[] = [];

    // Products
    products.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)) {
        filtered.push({
          title: p.title,
          category: 'Products',
          href: `/products/${p.id}`,
          description: p.shortDescription,
          icon: Cpu
        });
      }
    });

    // Industries
    industries.forEach((ind) => {
      if (ind.title.toLowerCase().includes(q) || ind.tagline.toLowerCase().includes(q)) {
        filtered.push({
          title: ind.title,
          category: 'Industries',
          href: '/industries',
          description: ind.tagline,
          icon: ShieldAlert
        });
      }
    });

    // Solutions
    solutions.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        filtered.push({
          title: s.title,
          category: 'Solutions',
          href: '/solutions',
          description: s.description,
          icon: LayoutTemplate
        });
      }
    });

    // Resources
    resourceDownloads.forEach((res) => {
      if (res.title.toLowerCase().includes(q) || res.category.toLowerCase().includes(q)) {
        filtered.push({
          title: res.title,
          category: `Downloads — ${res.category}`,
          href: '/resources',
          description: `Downloadable ${res.format} (${res.size})`,
          icon: FileText
        });
      }
    });

    techArticles.forEach((art) => {
      if (art.title.toLowerCase().includes(q) || art.summary.toLowerCase().includes(q)) {
        filtered.push({
          title: art.title,
          category: 'Resources — Technical Article',
          href: '/resources',
          description: art.summary,
          icon: FileText
        });
      }
    });

    // Basic static pages
    const mainPages = [
      { title: 'Technology Overview', href: '/technology', desc: 'Read about sensors, PLCs, embedded control systems.' },
      { title: 'Manufacturing Excellence', href: '/manufacturing', desc: 'Learn about our testing chambers, SMT pick-and-place lines, and certifications.' },
      { title: 'About Neural', href: '/about', desc: 'Our timeline, mission, vision, and leadership team.' },
      { title: 'Contact Us', href: '/contact', desc: 'Connect with a Neural sales engineer or request support.' }
    ];
    mainPages.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)) {
        filtered.push({
          title: p.title,
          category: 'Company Pages',
          href: p.href,
          description: p.desc,
          icon: LayoutTemplate
        });
      }
    });

    setResults(filtered.slice(0, 8)); // Max 8 results
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-[12vh] px-3 sm:px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/20 bg-card/95 shadow-[0_0_50px_-12px_rgba(59,130,246,0.35)] bp-grid-fine"
          >
            {/* Holographic Glowing Top Bar */}
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

            {/* Input Wrapper */}
            <div className="flex items-center gap-2.5 sm:gap-3 border-b border-border/80 px-4 sm:px-5 py-3.5 sm:py-4">
              <Search className="h-5 w-5 text-primary shrink-0 animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, datasheets, industries..."
                className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-foreground placeholder-muted-foreground outline-none border-none focus:ring-0"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95"
                  aria-label="Clear search input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Close search dialog"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <span className="hidden rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
                ESC
              </span>
            </div>

            {/* Results Container */}
            <div className="max-h-[50vh] sm:max-h-[360px] overflow-y-auto p-3 sm:p-4">
              {results.length > 0 ? (
                <div className="space-y-1">
                  <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Search Results ({results.length})
                  </div>
                  {results.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(r.href)}
                      className="group flex w-full items-start gap-3 sm:gap-4 rounded-xl border border-transparent p-3 text-left transition-all duration-200 hover:border-primary/10 hover:bg-secondary/40 min-h-[44px]"
                    >
                      <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <r.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {r.title}
                          </span>
                          <span className="text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
                            {r.category}
                          </span>
                        </div>
                        {r.description && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                            {r.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 self-center text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              ) : query.trim() ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle className="h-10 w-10 text-muted-foreground/60 animate-bounce" />
                  <p className="mt-4 text-sm text-foreground font-semibold">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try searching for &quot;interlocking&quot;, &quot;indicator&quot; or &quot;pharmaceutical&quot;.</p>
                </div>
              ) : (
                <div className="py-6 px-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Quick Links
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { title: 'Products Catalog', href: '/products' },
                      { title: 'Solutions Architectures', href: '/solutions' },
                      { title: 'Technology & Integration', href: '/technology' },
                      { title: 'Industries Served', href: '/industries' },
                      { title: 'About Timeline', href: '/about' },
                      { title: 'Manufacturing Tour', href: '/manufacturing' },
                      { title: 'Downloads & Manuals', href: '/resources' },
                      { title: 'Contact Support', href: '/contact' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelect(item.href)}
                        className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/10 px-4 py-3 text-left text-xs font-semibold text-foreground transition-all hover:border-primary/20 hover:bg-secondary/30 hover:text-primary"
                      >
                        {item.title}
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="flex justify-between items-center bg-secondary/20 px-5 py-3 border-t border-border/80 text-[10px] text-muted-foreground font-mono">
              <span>Press Up/Down to navigate, Enter to select</span>
              <span>NEURAL INDUSTRIAL INDEX v1.02</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
