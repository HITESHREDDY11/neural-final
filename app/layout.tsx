import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import NavbarServer from '@/components/NavbarServer';
import FooterServer from '@/components/FooterServer';
import NavigationProgressBar from '@/components/NavigationProgressBar';
import PageTransition from '@/components/PageTransition';

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
    'Making enterprises safe, smart, and sustainable with precision-engineered automation systems trusted across leading pharmaceutical facilities.',
  icons: {
    icon: '/assets/images/logo.png',
    shortcut: '/assets/images/logo.png',
    apple: '/assets/images/logo.png',
  },
  openGraph: {
    title: 'Neural Industrial Automation — Redefining Innovation & Excellence',
    description:
      'Precision-engineered automation systems trusted across leading pharmaceutical facilities.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts CDN for fast font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.className} antialiased`} suppressHydrationWarning>
        <NavigationProgressBar />
        <SmoothScroll>
          <div className="flex flex-col min-h-screen">
            <NavbarServer />
            <main className="flex-grow flex flex-col">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <FooterServer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

