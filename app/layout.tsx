import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neuralindustrialautomation.com'),
  title: 'Neural Industrial Automation — Redefining Innovation & Excellence',
  description:
    'Making enterprises safe, smart, and sustainable with precision-engineered automation systems trusted by 60+ pharmaceutical leaders.',
  icons: {
    icon: '/assets/images/logo.png',
    shortcut: '/assets/images/logo.png',
    apple: '/assets/images/logo.png',
  },
  openGraph: {
    title: 'Neural Industrial Automation — Redefining Innovation & Excellence',
    description:
      'Precision-engineered automation systems trusted by 60+ pharmaceutical leaders.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/assets/outfit.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen">
            <NavbarServer />
            <main className="flex-grow">
              {children}
            </main>
            <FooterServer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
