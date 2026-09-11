'use client';

import { useState, useEffect, useRef } from 'react';
import { Reveal, RevealItem } from '@/components/Reveal';
import { techTopics, TechTopic } from '@/lib/data';
import Link from 'next/link';
import { 
  Cpu, Zap, Compass, Network, ArrowRight, ShieldCheck, 
  Info, ChevronRight, Activity, Database, CheckCircle2 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'embedded-systems': Cpu,
  'industrial-electronics': Zap,
  'sensors-telemetry': Compass,
  'plc-iot-monitoring': Network
};


export default function TechnologyPage() {
  const [activeTopicId, setActiveTopicId] = useState('embedded-systems');
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const prevTopic = useRef(activeTopicId);

  const activeTopic = techTopics.find(t => t.id === activeTopicId) || techTopics[0];

  // Re-trigger node entry animation on topic switch
  useEffect(() => {
    if (prevTopic.current !== activeTopicId) {
      setMounted(false);
      prevTopic.current = activeTopicId;
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    } else {
      setMounted(true);
    }
  }, [activeTopicId]);

  const handleNodeClick = (nodeIdx: number) => {
    setSelectedNode(selectedNode === nodeIdx ? null : nodeIdx);
  };

  // Check if a connection involves the selected node
  const isConnectedLine = (fromIdx: number, toIdx: number) => {
    if (selectedNode === null) return false;
    return fromIdx === selectedNode || toIdx === selectedNode;
  };

  const getNodeDetails = (label: string) => {
    if (label.includes('Cortex-M')) return 'ARM Cortex-M 32-bit CPU running at 120MHz. Features hardware floating-point calculation units to process analog sensor reads.';
    if (label.includes('Watchdog')) return 'Dedicated external hardware IC monitoring CPU loops. Resets the microcontroller within 50ms if software execution halts.';
    if (label.includes('Opto')) return 'Optoisolation barriers filtering inputs. Rated for galvanic isolation up to 2.5kV to protect core circuitry from line spikes.';
    if (label.includes('Relay')) return 'Dual dry-contact mechanical relays rated at 5A/250V AC. Activates magnetic locks or ventilation dampers.';
    if (label.includes('MOV')) return 'Metal Oxide Varistors clamping transient voltages up to 2.5kV during lighting strikes or grid drops.';
    if (label.includes('L-C')) return 'Inductor-Capacitor Pi Filter filtering high frequency electrical noise from industrial motors.';
    if (label.includes('Clean DC')) return 'High-stability voltage regulator delivering ripple-free 5V and 3.3V DC to computing nodes.';
    if (label.includes('Transducer')) return 'Ultra-low range piezoresistive silicon diaphragm converting micro-pascals into micro-volts.';
    if (label.includes('ADC')) return 'High-resolution 24-bit Analog-to-Digital Converter mapping analog sensor signals with zero offset.';
    if (label.includes('Modbus')) return 'RS485 differential line transmitter operating Modbus RTU at 9600-115200 baud. Connects 247 nodes.';
    if (label.includes('Gateway')) return 'Ethernet/Wi-Fi Edge transceiver bridging RS485 loops into TCP/IP packages for cloud SCADA.';
    return 'Industrial telemetry node operating under continuous deterministic control loops.';
  };

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
            <span className="text-primary">Core Technology</span>
          </div>

          <Reveal className="mt-8 max-w-2xl">
            <RevealItem>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-primary/40" />
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Technical Architectures</p>
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Pillars</span>
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Our technology is designed for 100% operational uptime. From surge suppression and NABL calibration algorithms to Modbus interfaces, we engineer every layer.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      {/* Navigation tabs */}
      <section className="relative py-4 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex gap-2 overflow-x-auto no-scrollbar sm:flex-wrap border-b border-border/60 pb-3 sm:pb-6">
            {techTopics.map((t) => {
              const TabIcon = iconMap[t.id] || Cpu;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActiveTopicId(t.id); setSelectedNode(null); }}
                  className={`shrink-0 flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2.5 min-h-[44px] text-xs font-semibold uppercase tracking-wider transition-all border ${
                    activeTopicId === t.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20'
                      : 'bg-secondary/20 text-muted-foreground border-border/80 hover:bg-secondary/40 hover:text-foreground'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{t.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Technology breakdown display */}
      <section className="relative pb-32 pt-8 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left side: Technical explanations */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">{activeTopic.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground mt-4">{activeTopic.description}</p>
              </div>

              {/* Bullet points */}
              <div className="space-y-4 pt-4 border-t border-border/40">
                {activeTopic.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                      <ChevronRight className="h-3 w-3" />
                    </div>
                    <p className="text-xs leading-relaxed text-foreground/80">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Interactive click-to-explore node diagram */}
            <div className="lg:col-span-7 rounded-2xl border border-primary/20 bg-card/35 p-4 sm:p-6 md:p-8 backdrop-blur-md relative overflow-hidden bp-grid-fine flex flex-col min-h-[520px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />


              {/* Interactive Node Map Canvas */}
              <div className="flex-grow relative border border-border/60 rounded-xl bg-secondary/5 overflow-hidden" style={{ minHeight: '280px' }}>

                {/* Animated SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full fill-none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <style>{`
                      @keyframes dash-flow {
                        to { stroke-dashoffset: -20; }
                      }
                      .line-idle {
                        stroke: hsl(217 91% 60% / 0.18);
                        stroke-width: 1;
                        stroke-dasharray: 4 5;
                        animation: dash-flow 4s linear infinite;
                      }
                      .line-active {
                        stroke: hsl(217 91% 60% / 0.6);
                        stroke-width: 2;
                        stroke-dasharray: 6 4;
                        animation: dash-flow 2s linear infinite;
                      }
                    `}</style>
                  </defs>
                  {activeTopic.connections.map((c, idx) => {
                    const fromNode = activeTopic.nodes[c.from];
                    const toNode = activeTopic.nodes[c.to];
                    const active = isConnectedLine(c.from, c.to);
                    return (
                      <line
                        key={idx}
                        x1={`${fromNode.x}%`}
                        y1={`${fromNode.y}%`}
                        x2={`${toNode.x}%`}
                        y2={`${toNode.y}%`}
                        className={active ? 'line-active' : 'line-idle'}
                        style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                      />
                    );
                  })}
                </svg>

                {/* Render Nodes */}
                {activeTopic.nodes.map((node, idx) => {
                  const isSelected = selectedNode === idx;
                  const isCenter = node.x > 35 && node.x < 65 && node.y > 35 && node.y < 65;
                  return (
                    <button
                      key={`${activeTopicId}-${idx}`}
                      onClick={() => handleNodeClick(idx)}
                      style={{
                        left: `${node.x}%`,
                        top: `${node.y}%`,
                        transform: 'translate(-50%, -50%)',
                        position: 'absolute',
                        opacity: mounted ? 1 : 0,
                        scale: mounted ? '1' : '0.85',
                        transitionDelay: `${idx * 50}ms`,
                        transition: 'opacity 0.35s ease-out, scale 0.35s ease-out, box-shadow 0.2s, background 0.2s, border-color 0.2s',
                      }}
                      className={`
                        flex items-center justify-center rounded-xl border
                        px-2.5 sm:px-4 py-1.5 sm:py-2 font-mono font-bold tracking-wide
                        text-[11px] sm:text-[13px] shadow-sm cursor-pointer select-none
                        ${
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_12px_2px_hsl(217_91%_60%/0.25)]'
                            : isCenter
                            ? 'border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20 hover:border-primary/60'
                            : 'border-border/80 bg-card text-foreground hover:border-primary/40 hover:bg-secondary/50'
                        }
                      `}
                    >
                      {/* subtle static ring on hover only — no ping */}
                      <span className="relative z-10 whitespace-nowrap">{node.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanatory console panel */}
              <div className="mt-5 border-t border-border/50 pt-5">
                <div
                  className="rounded-xl border bg-secondary/10 p-5 min-h-[110px] transition-all duration-300"
                  style={{
                    borderColor: selectedNode !== null ? 'hsl(217 91% 60% / 0.25)' : 'hsl(222 30% 16% / 0.6)',
                    boxShadow: selectedNode !== null ? '0 0 12px -4px hsl(217 91% 60% / 0.15)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Info className="h-4 w-4 text-primary" />
                    <span>{selectedNode !== null ? activeTopic.nodes[selectedNode].label : 'Architecture Node Details'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {selectedNode !== null 
                      ? getNodeDetails(activeTopic.nodes[selectedNode].label)
                      : 'Click any node in the schematic above to decode its micro-architecture, calibration specs, or communication protocol details.'
                    }
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* QA Integration block */}
      <section className="relative py-24 border-t border-border/60 bg-secondary/5 z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="max-w-2xl mx-auto text-center flex flex-col items-center">
            <RevealItem>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </RevealItem>
            <RevealItem>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                PLC & SCADA Interoperability
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xl">
                Our controllers support Modbus registers pre-mapped to easily drag-and-drop into architectures by Siemens (TIA Portal), Schneider Electric (EcoStruxure), and Rockwell Automation.
              </p>
            </RevealItem>
            <RevealItem className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto items-stretch sm:items-center justify-center">
              <Link
                href="/resources"
                className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-full bg-primary px-7 text-xs font-semibold text-primary-foreground hover:bg-primary/85"
              >
                Download Modbus Maps
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-full border border-border bg-transparent px-7 text-xs font-semibold hover:bg-secondary"
              >
                Ask our Integrator
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>

    </main>
  );
}
