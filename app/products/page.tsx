import { Reveal, RevealItem } from '@/components/Reveal';
import { products } from '@/lib/data';
import Link from 'next/link';
import { 
  DoorClosed, Box, Wind, Cpu, Gauge, Thermometer, Activity, 
  ArrowRight, ShieldCheck, Cog, CheckCircle2, Clock, Settings 
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

// Animated Blueprint SVGs for each product type
function BlueprintDrawing({ id }: { id: string }) {
  if (id === 'door-interlocking-system') {
    return (
      <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 100 100">
        <rect x="15" y="15" width="28" height="70" rx="3" strokeDasharray="2,2" />
        <rect x="57" y="15" width="28" height="70" rx="3" />
        <circle cx="38" cy="50" r="2" className="fill-primary animate-pulse" />
        <circle cx="62" cy="50" r="2" className="fill-primary animate-pulse" />
        <path d="M 43 50 L 57 50" strokeDasharray="3,3" />
        <path d="M 30 10 L 30 15 M 70 10 L 70 15" />
        <circle cx="50" cy="50" r="10" className="stroke-accent/40" />
        <path d="M 50 40 L 50 60" />
      </svg>
    );
  }
  if (id === 'pass-box-interlocking-system') {
    return (
      <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 100 100">
        <rect x="20" y="20" width="60" height="60" rx="4" />
        <rect x="30" y="30" width="40" height="40" rx="2" strokeDasharray="3,3" />
        <line x1="10" y1="50" x2="20" y2="50" />
        <line x1="80" y1="50" x2="90" y2="50" />
        <path d="M 50 10 L 50 20 M 50 80 L 50 90" />
        <circle cx="50" cy="50" r="4" className="stroke-accent/50 animate-pulse" />
      </svg>
    );
  }
  if (id === 'air-shower-controller') {
    return (
      <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" rx="6" />
        <circle cx="30" cy="30" r="8" />
        <circle cx="70" cy="30" r="8" />
        <path d="M 30 38 Q 50 60 70 38" strokeDasharray="2,2" />
        <path d="M 50 70 Q 50 80 50 90" />
        {/* Animated wind lines */}
        <path d="M 20 60 L 25 75" className="stroke-accent/40 animate-pulse" />
        <path d="M 80 60 L 75 75" className="stroke-accent/40 animate-pulse" />
        <path d="M 50 55 L 50 70" />
      </svg>
    );
  }
  if (id === 'laf-buf-controller') {
    return (
      <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 100 100">
        <rect x="15" y="15" width="70" height="70" rx="5" />
        <line x1="15" y1="40" x2="85" y2="40" />
        <line x1="15" y1="70" x2="85" y2="70" strokeDasharray="2,2" />
        {/* Downflow arrows */}
        <path d="M 30 20 L 30 35 M 50 20 L 50 35 M 70 20 L 70 35" />
        <circle cx="50" cy="55" r="6" className="stroke-accent/50 animate-spin" style={{ transformOrigin: '50px 55px', animationDuration: '6s' }} />
      </svg>
    );
  }
  if (id === 'differential-pressure-indicator') {
    return (
      <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="36" />
        <circle cx="50" cy="50" r="6" />
        {/* Dial ticks */}
        <path d="M 50 14 L 50 20 M 86 50 L 80 50 M 50 86 L 50 80 M 14 50 L 20 50" />
        {/* Dial hand */}
        <path d="M 50 50 L 72 32" className="stroke-accent/80 transition-transform origin-[50px_50px]" style={{ transform: 'rotate(15deg)' }} />
        <text x="35" y="70" className="fill-primary/50 font-mono text-[8px] tracking-tighter" stroke="none">PASCAL</text>
      </svg>
    );
  }
  return (
    <svg className="w-full h-full stroke-primary/30 fill-none" viewBox="0 0 100 100">
      <rect x="25" y="15" width="50" height="70" rx="4" />
      <circle cx="50" cy="35" r="10" strokeDasharray="2,2" />
      <path d="M 35 60 L 65 60 M 35 70 L 65 70" />
      {/* Waveform */}
      <path d="M 15 50 Q 25 30 35 50 T 55 50 T 75 50" className="stroke-accent/40 animate-pulse" />
    </svg>
  );
}

export default function ProductsPage({ searchParams }: { searchParams: { category?: string | string[] } }) {
  const categories = ['All', 'Access Control', 'Controller', 'Sensor', 'Entrance Automation', 'Changeroom Automation', 'Digital Clocks'] as const;
  const categoryParam = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;
  const rawCategory = categoryParam || 'All';
  const activeCategory = categories.includes(rawCategory as any) 
    ? (rawCategory as 'All' | 'Access Control' | 'Controller' | 'Sensor' | 'Entrance Automation' | 'Changeroom Automation' | 'Digital Clocks') 
    : 'All';

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.tag === activeCategory);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* Blueprint Grid & Scan Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bp-grid" />
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none scan-line w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-[20%] left-[-10%] bg-glow-breathe-1" />
      <div className="absolute bottom-[20%] right-[-10%] bg-glow-breathe-2" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary">Products Catalog</span>
          </div>

          <Reveal className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <RevealItem>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/40" />
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">System Modules</p>
                </div>
              </RevealItem>
              <RevealItem>
                <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Precision Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hardware</span>
                </h1>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  Highly-calibrated interlocking systems, controllers, and transmitters engineered for ISO cleanrooms and critical containment suites. Meets CE and ISO certification baselines.
                </p>
              </RevealItem>
            </div>

            {/* Technical Stats */}
            <RevealItem className="flex gap-8 border-l border-border/80 pl-6 md:pl-10 py-2">
              <div>
                <div className="text-3xl font-extrabold text-primary">9+</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase font-semibold tracking-wider">Product Categories</div>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="relative py-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-2 border-b border-border/60 pb-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === 'All' ? '/products' : `/products?category=${encodeURIComponent(cat)}`}
                scroll={false}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                    : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40 hover:text-foreground'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative pb-32 pt-8 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal key={activeCategory} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => {
              const Icon = iconMap[p.iconName as keyof typeof iconMap] || Cpu;
              return (
                <RevealItem key={p.id} className="h-full">
                  <Link
                    href={`/products/${p.id}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-8 card-premium"
                  >
                    {/* Blueprint Grid Accent within Card */}
                    <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] bp-grid-fine group-hover:opacity-[0.06] transition-opacity" />

                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        {p.tag}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Animated Blueprint Drawing Block */}
                    <div className="relative mt-8 h-40 w-full rounded-xl border border-border/50 bg-secondary/5 overflow-hidden flex items-center justify-center p-4">
                      <BlueprintDrawing id={p.id} />
                    </div>

                    {/* Text details */}
                    <div className="mt-8 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-grow">
                      {p.shortDescription}
                    </p>

                    {/* Applications bullets */}
                    <div className="mt-6 border-t border-border/50 pt-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Key Applications</span>
                      <ul className="grid grid-cols-2 gap-2">
                        {p.applications.slice(0, 2).map((app, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 text-xs text-foreground/80 font-medium truncate">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Explore Details link */}
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                      Explore Technical Specifications
                      <span className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-primary">→</span>
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Dynamic CTA */}
      <section className="relative border-t border-border/60 bg-secondary/5 py-24 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 text-center">
          <Reveal className="max-w-2xl mx-auto flex flex-col items-center">
            <RevealItem>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Need a Custom Automation Spec?
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Our senior engineering team co-develops bespoke controllers and interlocks integrated with specific fire panels, PLC platforms, or SCADA environments.
              </p>
            </RevealItem>
            <RevealItem className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/85 shadow-lg shadow-primary/20"
              >
                Consult Sales Engineer
              </Link>
              <Link
                href="/resources"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-transparent px-8 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Download Catalogs
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
