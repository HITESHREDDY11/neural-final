export function PageSkeleton() {
  return (
    <div className="relative min-h-[calc(100vh-72px)] w-full flex-grow bg-background text-foreground overflow-hidden pt-28 pb-16 px-6 sm:px-10 lg:px-16">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bp-grid-fine" />
      <div className="absolute top-[20%] left-[-10%] bg-glow-breathe-1 opacity-30" />

      {/* Top glowing laser line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/20 via-primary to-cyan-400 animate-pulse" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-3 w-12 rounded bg-secondary/50 animate-pulse" />
          <span className="text-muted-foreground/30">/</span>
          <div className="h-3 w-20 rounded bg-primary/20 animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="max-w-2xl space-y-4 mb-14">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary/40" />
            <div className="h-3 w-28 rounded bg-primary/25 animate-pulse" />
          </div>
          <div className="h-10 w-3/4 rounded-xl bg-secondary/60 animate-pulse" />
          <div className="h-4 w-full rounded bg-secondary/40 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-secondary/30 animate-pulse" />
        </div>

        {/* Filter / tabs skeleton */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-6 border-b border-border/40">
          {[80, 110, 95, 85, 130].map((w, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-secondary/40 border border-border/50 animate-pulse"
              style={{ width: `${w}px`, animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Cards grid skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/60 bg-card/60 p-8 space-y-6 animate-pulse"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Card top badge & icon */}
              <div className="flex items-center justify-between">
                <div className="h-5 w-24 rounded-full bg-primary/15" />
                <div className="h-8 w-8 rounded-full bg-secondary/60" />
              </div>
              {/* Card blueprint graphic placeholder */}
              <div className="h-36 w-full rounded-xl border border-border/40 bg-secondary/20 flex items-center justify-center">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20" />
              </div>
              {/* Card title & text */}
              <div className="space-y-2.5">
                <div className="h-5 w-3/5 rounded bg-secondary/70" />
                <div className="h-3.5 w-full rounded bg-secondary/40" />
                <div className="h-3.5 w-4/5 rounded bg-secondary/30" />
              </div>
              {/* Card bottom link */}
              <div className="pt-4 border-t border-border/40 flex justify-between items-center">
                <div className="h-3 w-32 rounded bg-secondary/50" />
                <div className="h-3 w-4 rounded bg-primary/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;

