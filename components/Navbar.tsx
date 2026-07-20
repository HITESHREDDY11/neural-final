'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, Cpu, Gauge, DoorClosed, Wind, ArrowRight, Lightbulb, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

// Dynamically loaded — SearchModal imports ALL site data synchronously.
// Deferring it eliminates that parse cost from every page's initial load.
const SearchModal = dynamic(() => import('./SearchModal'), { ssr: false });


const navItems = [
  { label: 'Products', href: '/products', hasMega: true },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Technology', href: '/technology' },
  { label: 'Industries', href: '/industries' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
];

const MegaMenu = React.memo(function MegaMenu({
  showMega,
  setShowMega,
}: {
  showMega: boolean;
  setShowMega: (show: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {showMega && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setShowMega(true)}
          onMouseLeave={() => setShowMega(false)}
          className="absolute left-0 top-full z-40 w-full border-b border-border/60 bg-background/95 shadow-xl backdrop-blur-md"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-8 py-10 lg:px-12">
            {/* Col 1: Core Cleanroom Modules */}
            <div className="col-span-4 border-r border-border/40 pr-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-5">
                <DoorClosed className="h-4 w-4" />
                <span>Control & Airlocks</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Door Interlocking System - upto 16 doors', desc: 'Secure air cascades with active multi-door locks.', id: 'door-interlocking-system' },
                  { title: 'Passbox Interlocking System - upto 3 doors', desc: 'Prevent hatch cross-contamination sequentially.', id: 'pass-box-interlocking-system' },
                  { title: 'Air Shower - upto 5 doors', desc: 'Personnel particulate removal control unit.', id: 'air-shower-controller' },
                  { title: 'LAF / BUF Controller', desc: 'Laminar flow fan and HEPA monitoring controls.', id: 'laf-buf-controller' }
                ].map((p) => (
                  <Link
                    key={p.id}
                    prefetch={false}
                    href={`/products/${p.id}`}
                    className="group block rounded-xl p-2.5 transition-all hover:bg-secondary/40"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {p.title}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 2: Telemetry & Sensors */}
            <div className="col-span-4 border-r border-border/40 pr-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-5">
                <Gauge className="h-4 w-4" />
                <span>Telemetry & Sensors</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Differential Pressure Indicator', desc: 'Digital ultra-low range pressure indicator.', id: 'differential-pressure-indicator' },
                  { title: 'Temperature & RH Indicator', desc: 'Dual displays flush-mounted for cleanroom walls.', id: 'temperature-rh-indicator' },
                  { title: 'Temperature & RH Transmitter', desc: 'High-stability HVAC duct or remote transmitters.', id: 'temperature-rh-transmitter' }
                ].map((p) => (
                  <Link
                    key={p.id}
                    prefetch={false}
                    href={`/products/${p.id}`}
                    className="group block rounded-xl p-2.5 transition-all hover:bg-secondary/40"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {p.title}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3: Automation & Auxiliaries */}
            <div className="col-span-4 pr-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-5">
                <Cpu className="h-4 w-4" />
                <span>Automation & Auxiliaries</span>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Swing Door Automation', desc: 'Contactless automated opening systems for heavy doors.', id: 'swing-door-automation' },
                  { title: 'Smart Locker', desc: 'Dynamic locker assignments via biometrics.', id: 'smart-locker' },
                  { title: 'Wired & Wireless Cleanroom Clocks', desc: 'LED clocks synchronized via GPS/Modbus loops.', id: 'cleanroom-clock' }
                ].map((p) => (
                  <Link
                    key={p.id}
                    prefetch={false}
                    href={`/products/${p.id}`}
                    className="group block rounded-xl p-2.5 transition-all hover:bg-secondary/40"
                  >
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                      {p.title}
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMega, setShowMega] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setOpen(false);
    setShowMega(false);
  }, [pathname]);

  // Toggle Search Modal on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname === '/') {
        // Scroll using Lenis or standard element scroll
        const target = document.querySelector(href);
        if (target) {
          const lenis = (window as any).__lenis;
          if (lenis) {
            lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        router.push('/' + href);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 z-50 w-full transition-all duration-500',
          scrolled || open || showMega
            ? 'bg-background/95 backdrop-blur-md border-b border-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link prefetch={false} href="/" className="group flex items-center">
            <div className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/images/logo.png"
                alt="Neural Industrial Automation"
                width={160}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Nav Items - Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.hasMega && setShowMega(true)}
                onMouseLeave={() => item.hasMega && setShowMega(false)}
              >
                {item.hasMega ? (
                  <Link
                    prefetch={false}
                    href={item.href}
                    className={cn(
                      'relative flex items-center gap-1 rounded-full px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground z-10',
                      pathname.startsWith(item.href) && 'text-primary font-semibold'
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", showMega && "rotate-180 text-primary")} />
                    {pathname.startsWith(item.href) && (
                      <motion.span
                        layoutId="activeNavBubble"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                  </Link>
                ) : (
                  <Link
                    prefetch={false}
                    href={item.href}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground z-10',
                      pathname === item.href && 'text-primary font-semibold'
                    )}
                  >
                    <span>{item.label}</span>
                    {pathname === item.href && (
                      <motion.span
                        layoutId="activeNavBubble"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 items-center gap-2 rounded-full border border-border/80 bg-secondary/30 px-3 text-muted-foreground transition-all hover:border-primary/30 hover:bg-secondary hover:text-foreground"
              title="Search"
            >
              <Search className="h-4 w-4 text-primary" />
              <span className="text-xs">Search</span>
            </button>

            <Link
              href="/contact"
              className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/85 hover:shadow-md hover:shadow-primary/30"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Menu & Search triggers */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-primary" />
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-foreground transition-colors hover:bg-secondary"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mega Menu Dropdown */}
        <MegaMenu showMega={showMega} setShowMega={setShowMega} />
      </motion.header>

      {/* Mobile Nav Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-[72px] z-40 w-full border-b border-border/60 bg-background/95 px-5 pb-8 pt-3 shadow-xl backdrop-blur-md md:hidden overflow-y-auto max-h-[calc(100vh-72px)]"
          >
            <div className="space-y-4">
              <div>
                <p className="px-4 text-[10px] font-semibold uppercase tracking-wider text-primary mb-2">Navigation</p>
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        prefetch={false}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex h-11 items-center rounded-xl px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary',
                          pathname.startsWith(item.href) && 'bg-secondary text-primary'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border/50 pt-4 px-2">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Search Command Palette */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

