import Hero from '@/components/three/Hero';
import Clients from '@/components/Clients';
import Features from '@/components/Features';
import Products from '@/components/Products';
import HoverGallery from '@/components/HoverGallery';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Hero />
      <Clients />
      <Features />
      <Products />
      <HoverGallery />
      <CTA />
    </main>
  );
}

