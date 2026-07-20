'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';

type Client = {
  name: string;
  logo: string;
};

const ROW_1: Client[] = [
  { name: 'Aurobindo Pharma', logo: '/assets/clients/aurobindo.png' },
  { name: 'Hetero Drugs', logo: '/assets/clients/hetero.png' },
  { name: 'Micro Labs Limited', logo: '/assets/clients/micro-labs.png' },
  { name: 'Biological E. Limited', logo: '/assets/clients/biological-e.png' },
  { name: 'iClean Takasago', logo: '/assets/clients/iclean.png' },
  { name: 'Titan Company', logo: '/assets/clients/titan.png' },
  { name: 'Amneal Pharmaceuticals', logo: '/assets/clients/amneal.png' },
  { name: 'Natco Pharma Limited', logo: '/assets/clients/natco.png' },
  { name: 'Indoco Remedies', logo: '/assets/clients/indoco.png' },
  { name: 'Indian Immunologicals', logo: '/assets/clients/indian-immunologicals.png' },
  { name: 'FDC Limited', logo: '/assets/clients/fdc.png' },
  { name: 'Suven Pharmaceuticals', logo: '/assets/clients/suven.png' },
  { name: 'Sentiss Pharma', logo: '/assets/clients/sentiss.png' },
  { name: 'Optimus Pharma', logo: '/assets/clients/optimus.png' },
  { name: 'Honour Lab', logo: '/assets/clients/honour.png' },
];

const ROW_2: Client[] = [
  { name: 'Vivin Pharmaceuticals', logo: '/assets/clients/vivin.png' },
  { name: 'Horizon Biolabs', logo: '/assets/clients/horizon.png' },
  { name: 'Nicomac Far East', logo: '/assets/clients/nicomac.png' },
  { name: 'Sanzyme Biologics', logo: '/assets/clients/sanzyme.png' },
  { name: 'Brilliant Bio Pharma', logo: '/assets/clients/brilliant.png' },
  { name: 'Clean Flow Technology', logo: '/assets/clients/clean-flow.png' },
  { name: 'Globion Biotech', logo: '/assets/clients/globion.png' },
  { name: 'Glochem Industries', logo: '/assets/clients/glochem.png' },
  { name: 'Rampex Labs Pvt. Ltd.', logo: '/assets/clients/rampex.png' },
  { name: 'RL Fine Chem Pvt. Ltd.', logo: '/assets/clients/rl-fine-chem.png' },
  { name: 'Limpio Projects', logo: '/assets/clients/limpio.png' },
  { name: 'Lennox Clean Air Technologies', logo: '/assets/clients/lennox.png' },
  { name: 'Hemair Luftkanalsysteme', logo: '/assets/clients/hemair.png' },
  { name: 'Vinair Systems', logo: '/assets/clients/vinair.png' },
];

const ROW_3: Client[] = [
  { name: 'Ezone Rest Assured', logo: '/assets/clients/ezone.png' },
  { name: 'GreenSignal Bio Pharma', logo: '/assets/clients/green-signal.png' },
  { name: 'Lara Drugs Pvt. Ltd.', logo: '/assets/clients/lara-drugs.png' },
  { name: 'LN Laboratories', logo: '/assets/clients/ln-laboratories.png' },
  { name: 'Lofty Laboratories', logo: '/assets/clients/lofty.png' },
  { name: 'Maiya Pharma Pvt. Ltd.', logo: '/assets/clients/maiya.png' },
  { name: 'MAK Industries', logo: '/assets/clients/mak.png' },
  { name: 'SAM Products Pvt. Ltd.', logo: '/assets/clients/sam.png' },
  { name: 'Sunrise International', logo: '/assets/clients/sunrise.png' },
  { name: 'SVR Biograft', logo: '/assets/clients/svr.png' },
  { name: 'Siflon Drugs', logo: '/assets/clients/siflon.png' },
  { name: 'Valentis Laboratories', logo: '/assets/clients/valentis.png' },
  { name: 'Vamsi Pharma Pvt. Ltd.', logo: '/assets/clients/vamsi.png' },
];

function LogoCard({ client }: { client: Client }) {
  return (
    <div className="group relative mx-4 flex shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.01] p-1.5 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.04] hover:shadow-[0_0_32px_-4px_rgba(59,130,246,0.15)]">
      <div
        className="relative h-14 w-28 overflow-hidden rounded-xl p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-[1.03] bg-white/[0.92] group-hover:bg-white"
      >
        <Image
          src={client.logo}
          alt={client.name}
          width={224}
          height={112}
          quality={95}
          className="max-h-full max-w-full object-contain filter contrast-[1.05] brightness-[0.98]"
        />
      </div>
    </div>
  );
}

function MarqueeTrack({
  clients,
  direction = 'left',
  duration = 60,
  paused,
}: {
  clients: Client[];
  direction?: 'left' | 'right';
  duration?: number;
  paused: boolean;
}) {
  const tripled = [...clients, ...clients, ...clients];

  return (
    <div className="relative flex w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[hsl(222,47%,6%)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[hsl(222,47%,6%)] to-transparent" />
      <div
        className="flex"
        aria-hidden="true"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {tripled.map((client, i) => (
          <LogoCard key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}



export default function Clients() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="clients" className="relative overflow-hidden pt-16 lg:pt-20 pb-12">
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(217,91%,60%,0.07),transparent)]" />

      {/* Header */}
      <div className="relative mx-auto mb-16 max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            Trusted By Industry Leaders
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            60+ Pharmaceutical &amp; <br />
            <span className="text-white/40">Cleanroom Pioneers</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/50">
            From multinational pharma corporations to specialist biotech labs — the industry&apos;s most
            demanding environments trust Neural systems.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — pauses on hover/focus, controlled by button for keyboard users */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        role="region"
        aria-label="Client logo marquee"
        className="space-y-3"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <MarqueeTrack clients={ROW_1} direction="left" duration={65} paused={paused} />
        <MarqueeTrack clients={ROW_2} direction="right" duration={55} paused={paused} />
        <MarqueeTrack clients={ROW_3} direction="left" duration={72} paused={paused} />
      </motion.div>

      {/* Accessible pause/play control — satisfies WCAG 2.2.2 */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play client logos animation' : 'Pause client logos animation'}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-white/50 transition-colors hover:border-white/20 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
    </section>
  );
}
