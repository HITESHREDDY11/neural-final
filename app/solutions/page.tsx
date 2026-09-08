'use client';

import { useState } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import { solutions, Solution } from '@/lib/data';
import Link from 'next/link';
import { 
  Workflow, ArrowRight, Play, RotateCcw, 
  DoorOpen, Wind, Gauge, Key, Lock, BellRing 
} from 'lucide-react';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'cleanroom-entry-control' | 'environmental-monitoring-cascade' | 'laminar-air-flow'>('cleanroom-entry-control');
  const [simulationStep, setSimulationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerVal, setTimerVal] = useState(12);

  const activeSol = solutions.find(s => s.id === activeTab) || solutions[0];

  const handleNextStep = () => {
    if (activeTab === 'cleanroom-entry-control') {
      setSimulationStep((prev) => (prev + 1) % 4);
    } else {
      setSimulationStep((prev) => (prev + 1) % 3);
    }
  };

  const handleReset = () => {
    setSimulationStep(0);
    setIsPlaying(false);
    setTimerVal(12);
  };

  const triggerSimulation = () => {
    setIsPlaying(true);
    setSimulationStep(0);
    
    // Simple sequence simulation
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setSimulationStep(step);
      if (step === 3 && activeTab === 'cleanroom-entry-control') {
        // Run down timer for air shower
        let time = 12;
        const timer = setInterval(() => {
          time--;
          setTimerVal(time);
          if (time === 0) {
            clearInterval(timer);
            setSimulationStep(3); // transition to exit
          }
        }, 150);
      }
      const maxStep = activeTab === 'cleanroom-entry-control' ? 3 : 2;
      if (step >= maxStep) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 2000);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* Blueprint background grid */}
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
            <span className="text-primary">Architectural Solutions</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">System Integrations</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Integrated Cleanroom <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Architectures</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                We coordinate standalone controllers and indicators into high-reliability environmental protection systems. Explore our interactive workflow diagrams representing compliance processes.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Selector Tabs */}
      <section className="relative py-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex border-b border-border/60 pb-6">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => { setActiveTab('cleanroom-entry-control'); handleReset(); }}
                className={`rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                  activeTab === 'cleanroom-entry-control'
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                }`}
              >
                Cleanroom Airlock & Entry
              </button>
              <button
                onClick={() => { setActiveTab('environmental-monitoring-cascade'); handleReset(); }}
                className={`rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                  activeTab === 'environmental-monitoring-cascade'
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                }`}
              >
                Environmental Monitoring Cascade
              </button>
              <button
                onClick={() => { setActiveTab('laminar-air-flow'); handleReset(); }}
                className={`rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
                  activeTab === 'laminar-air-flow'
                    ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40'
                }`}
              >
                Laminar Air Flow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow display */}
      <section className="relative pb-32 pt-8 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left side: Solution Description & Workflow list */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{activeSol.title}</h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{activeSol.description}</p>
              </div>

              {/* Steps progression */}
              <div className="space-y-4 pt-4">
                {activeSol.workflow.map((node, idx) => (
                  <div
                    key={node.step}
                    className={`flex items-start gap-4 rounded-xl border p-4.5 transition-all duration-300 ${
                      simulationStep === idx
                        ? 'border-primary/40 bg-primary/[0.03] shadow-[inset_0_0_15px_rgba(59,130,246,0.05)]'
                        : 'border-border/60 bg-card/25'
                    }`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold ${
                      simulationStep === idx ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {node.step}
                    </span>
                    <div>
                      <h4 className={`text-sm font-bold ${simulationStep === idx ? 'text-primary' : 'text-foreground'}`}>
                        {node.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{node.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Interactive Workflow Schematic Diagram */}
            <div className="lg:col-span-7 rounded-2xl border border-primary/20 bg-card/35 p-8 backdrop-blur-md relative overflow-hidden bp-grid-fine flex flex-col min-h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />

              {/* Status Header */}
              <div className="w-full flex justify-between items-center text-[9px] font-mono text-muted-foreground/60 border-b border-border/40 pb-4 mb-8">
                <span>SIMULATION_CONSOLE: {activeTab.toUpperCase()}_v2.4</span>
                <span className="flex items-center gap-1.5 text-accent">
                  <span className={`h-1.5 w-1.5 rounded-full bg-accent ${isPlaying && 'animate-ping'}`} />
                  {isPlaying ? 'SEQUENCE_SIMULATION_ACTIVE' : 'SIMULATION_IDLE'}
                </span>
              </div>

              {/* Main SVG Schematic */}
              <div className="flex-grow flex items-center justify-center py-6">
                {activeTab === 'cleanroom-entry-control' ? (
                  <svg className="w-full max-w-lg h-56 stroke-primary/30 fill-none" viewBox="0 0 300 150">
                    {/* Zones grids outline */}
                    <rect x="10" y="20" width="80" height="110" rx="3" strokeDasharray="3,3" />
                    <rect x="110" y="20" width="80" height="110" rx="3" strokeDasharray="3,3" strokeWidth="2" className={simulationStep === 2 ? 'stroke-primary' : ''} />
                    <rect x="210" y="20" width="80" height="110" rx="3" strokeDasharray="3,3" />

                    <text x="25" y="15" className="fill-muted-foreground font-mono text-[8px]" stroke="none">ANTEROOM</text>
                    <text x="122" y="15" className="fill-primary font-mono text-[8px]" stroke="none">AIR SHOWER</text>
                    <text x="220" y="15" className="fill-muted-foreground font-mono text-[8px]" stroke="none">CLEANROOM</text>

                    {/* Path routing line */}
                    <path d="M 50 75 L 150 75 L 250 75" strokeDasharray="2,2" />

                    {/* RFID Door 1 */}
                    <line x1="90" y1="55" x2="90" y2="95" className={simulationStep > 0 ? "stroke-emerald-500 stroke-2" : "stroke-rose-500 stroke-2"} />
                    <circle cx="90" cy="75" r="4" className={simulationStep === 1 ? "fill-emerald-500 stroke-none" : "fill-rose-500 stroke-none"} />

                    {/* Door 2 */}
                    <line x1="200" y1="55" x2="200" y2="95" className={simulationStep === 3 ? "stroke-emerald-500 stroke-2" : "stroke-rose-500 stroke-2"} />
                    <circle cx="200" cy="75" r="4" className={simulationStep === 3 ? "fill-emerald-500 stroke-none" : "fill-rose-500 stroke-none"} />

                    {/* Air shower nozzles */}
                    <path d="M 125 35 L 130 50 M 175 35 L 170 50 M 125 115 L 130 100 M 175 115 L 170 100" strokeWidth="2" />
                    {simulationStep === 2 && (
                      <path d="M 130 50 Q 150 75 170 100 M 170 50 Q 150 75 130 100" className="stroke-accent stroke-2 animate-pulse" strokeDasharray="2,2" />
                    )}

                    {/* Personnel node */}
                    <circle
                      cx={simulationStep === 0 ? "50" : simulationStep === 1 ? "90" : simulationStep === 2 ? "150" : "250"}
                      cy="75"
                      r="6"
                      className="fill-primary stroke-none transition-all duration-700"
                    />
                  </svg>
                ) : activeTab === 'environmental-monitoring-cascade' ? (
                  <svg className="w-full max-w-lg h-56 stroke-primary/30 fill-none" viewBox="0 0 300 150">
                    {/* DP Indicators cascading */}
                    <rect x="20" y="30" width="70" height="50" rx="3" className="stroke-primary/50" />
                    <rect x="115" y="30" width="70" height="50" rx="3" className="stroke-primary/50" />
                    <rect x="210" y="30" width="70" height="50" rx="3" className="stroke-primary/50" />

                    <text x="35" y="24" className="fill-muted-foreground font-mono text-[7px]" stroke="none">ZONE_A (+30 Pa)</text>
                    <text x="130" y="24" className="fill-muted-foreground font-mono text-[7px]" stroke="none">ZONE_B (+15 Pa)</text>
                    <text x="225" y="24" className="fill-muted-foreground font-mono text-[7px]" stroke="none">CORRIDOR (0 Pa)</text>

                    {/* Readings values inside boxes */}
                    <text x="42" y="58" className="fill-foreground font-mono text-xs font-bold" stroke="none">30.2</text>
                    <text x="137" y="58" className="fill-foreground font-mono text-xs font-bold" stroke="none">15.1</text>
                    <text x="235" y="58" className="fill-foreground font-mono text-xs font-bold" stroke="none">0.0</text>

                    {/* Interconnection daisy chain lines */}
                    <path d="M 90 55 L 115 55 M 185 55 L 210 55" className="stroke-primary/40" />
                    <circle cx="102" cy="55" r="2" className="fill-primary" />
                    <circle cx="197" cy="55" r="2" className="fill-primary" />

                    {/* Pushing to central SCADA receiver */}
                    <path d="M 150 80 L 150 115 L 230 115" className={simulationStep === 2 ? "stroke-accent stroke-2 animate-pulse" : "stroke-border"} />
                    <rect x="230" y="100" width="55" height="30" rx="2" className={simulationStep === 2 ? "stroke-accent" : "stroke-border"} />
                    <text x="242" y="118" className="fill-foreground font-mono text-[8px]" stroke="none">SCADA</text>

                    {simulationStep === 2 && (
                      <circle cx="230" cy="115" r="3" className="fill-accent animate-ping" />
                    )}
                  </svg>
                ) : (
                  /* Laminar Air Flow System SVG Schematic */
                  <svg className="w-full max-w-lg h-56 stroke-primary/30 fill-none" viewBox="0 0 300 150">
                    {/* Main Cabinet Frame */}
                    <rect x="50" y="15" width="200" height="120" rx="6" className="stroke-primary/40" strokeWidth="1.5" />

                    {/* Top Blower Housing Plenum */}
                    <rect x="70" y="25" width="160" height="30" rx="3" className={`transition-all duration-300 ${simulationStep === 0 ? 'stroke-primary fill-primary/10' : 'stroke-primary/40'}`} />
                    <text x="105" y="42" className="fill-primary font-mono text-[8px] font-bold" stroke="none">AIR INTAKE & BLOWER</text>
                    
                    {/* Air Intake Grills */}
                    <path d="M 80 20 L 80 25 M 100 20 L 100 25 M 120 20 L 120 25 M 180 20 L 180 25 M 200 20 L 200 25 M 220 20 L 220 25" strokeWidth="1.5" className={simulationStep === 0 ? 'stroke-accent' : 'stroke-primary/50'} />

                    {/* HEPA Filter Bar */}
                    <rect x="70" y="60" width="160" height="16" rx="2" className={`transition-all duration-300 ${simulationStep === 1 ? 'stroke-accent fill-accent/20' : 'stroke-primary/50 fill-secondary/40'}`} strokeWidth="1.5" />
                    <text x="108" y="71" className="fill-foreground font-mono text-[7.5px] font-bold" stroke="none">HEPA FILTER CHAMBER</text>

                    {/* Unidirectional Laminar Air Flow Stream Lines */}
                    <g className={`transition-opacity duration-300 ${simulationStep === 2 ? 'opacity-100' : 'opacity-40'}`}>
                      <path d="M 85 80 L 85 115 M 115 80 L 115 115 M 150 80 L 150 115 M 185 80 L 185 115 M 215 80 L 215 115" strokeDasharray="3,3" strokeWidth="1.5" className={simulationStep === 2 ? 'stroke-primary animate-pulse' : 'stroke-primary/30'} />
                      
                      {/* Flow direction arrows */}
                      <path d="M 82 110 L 85 115 L 88 110 M 112 110 L 115 115 L 118 110 M 147 110 L 150 115 L 153 110 M 182 110 L 185 115 L 188 110 M 212 110 L 215 115 L 218 110" strokeWidth="1.5" className={simulationStep === 2 ? 'stroke-accent' : 'stroke-primary/40'} />
                    </g>

                    {/* Work Surface Table */}
                    <rect x="65" y="118" width="170" height="8" rx="1" className="fill-secondary stroke-primary/50" />
                    <text x="106" y="125" className="fill-muted-foreground font-mono text-[7px]" stroke="none">CRITICAL WORK SURFACE</text>
                  </svg>
                )}
              </div>

              {/* Simulation panel controls */}
              <div className="border-t border-border/40 pt-5 flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  <button
                    disabled={isPlaying}
                    onClick={triggerSimulation}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/85 disabled:opacity-50"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Run Simulation</span>
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={isPlaying}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border/80 bg-secondary/15 px-4 text-xs font-semibold hover:bg-secondary disabled:opacity-50"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {activeTab === 'cleanroom-entry-control' && simulationStep === 2 && (
                    <div className="text-xs font-mono text-accent animate-pulse font-bold">
                      HEPA TIMER: 00:{timerVal < 10 ? `0${timerVal}` : timerVal}
                    </div>
                  )}
                  <button
                    onClick={handleReset}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Highlights Section */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl mb-12">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Integration Details</span>
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight">System Specification highlights</h2>
            </RevealItem>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {activeSol.technicalHighlights.map((hl, idx) => (
              <div key={idx} className="rounded-xl border border-border/80 bg-card/40 p-6 backdrop-blur-sm">
                <span className="text-xs font-mono text-primary font-bold">SPEC_HIGHLIGHT_0{idx+1}</span>
                <p className="text-sm font-semibold text-foreground/90 mt-4 leading-relaxed">{hl}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
