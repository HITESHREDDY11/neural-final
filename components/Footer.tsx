'use client';

import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const productLinks = [
  { label: 'Door Interlocking', href: '/products/door-interlocking-system' },
  { label: 'Pass Box System', href: '/products/pass-box-interlocking-system' },
  { label: 'Air Shower Controller', href: '/products/air-shower-controller' },
  { label: 'LAF/BUF Controller', href: '/products/laf-buf-controller' },
  { label: 'View All →', href: '/products' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Solutions & Tech', href: '/solutions' },
  { label: 'Contact', href: '/contact' },
  { label: 'Home Automation ↗', href: 'https://nhawebsite-b6212.web.app/', external: true },
];

const socials = [
  { icon: Linkedin, href: 'https://in.linkedin.com/company/neuralindustrialautomation-pvt-ltd', label: 'LinkedIn', external: true },
  { icon: Mail, href: 'mailto:sales@neuralindustrialautmation.in', label: 'Email' },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname === '/') {
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
    <footer className="border-t border-border/50 bg-secondary/10 relative z-10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-12">
          <div>
            <Link href="/" className="group flex items-center">
              <div className="relative h-10 w-auto transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/images/logo.png"
                  alt="Neural Industrial Automation"
                  width={130}
                  height={36}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="mt-4 sm:mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Making enterprises safe, smart, and sustainable with precision-engineered automation solutions.
            </p>
            <div className="mt-5 sm:mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-11 w-11 min-h-[44px] min-w-[44px] sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-primary/30 hover:bg-secondary hover:text-primary active:scale-95"
                >
                  <s.icon className="h-4.5 w-4.5 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Products</h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary inline-block py-0.5">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary inline-block py-0.5"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleAnchorClick(e, l.href)}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary inline-block py-0.5"
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                2-1/126, N NCL Ln, Ruby Block, Satyam Enclave,<br />
                Kompally, Hyderabad, Telangana 500014
              </p>
              <p>
                Email:{' '}
                <a href="mailto:sales@neuralindustrialautmation.in" className="transition-colors hover:text-primary break-all">
                  sales@neuralindustrialautmation.in
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border/50 pt-8">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Certified:</span>
          {['CE Certified', 'ISO 9001'].map((c) => (
            <span key={c} className="rounded-full border border-border/60 bg-secondary/30 px-3 py-1 text-xs text-foreground/70">{c}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 border-t border-border/50 pt-8 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Neural Industrial Automation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

