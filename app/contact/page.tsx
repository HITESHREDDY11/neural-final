import CTA from '@/components/CTA';
import Link from 'next/link';

export const metadata = {
  title: 'Contact & Engineering Enquiry | Neural Industrial Automation',
  description: 'Submit an engineering enquiry for cleanroom controllers, door interlocking systems, differential pressure indicators, and custom CAD drawings.',
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pt-20">
      {/* Page Header / Breadcrumb */}
      <div className="mx-auto max-w-7xl px-5 pt-10 pb-2 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-primary">Contact & Technical Enquiry</span>
        </div>
      </div>

      {/* Dedicated Enquiry Section */}
      <CTA />
    </main>
  );
}

