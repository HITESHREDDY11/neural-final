/**
 * NavbarServer.tsx
 * Thin RSC wrapper that renders the client Navbar.
 * Lives in the root layout — persists across every route.
 * Dynamic import with ssr:false eliminates hydration blocking
 * because the Navbar has no meaningful server-rendered content
 * that differs from client (it uses usePathname, useScrollY, etc.)
 */
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function NavbarServer() {
  return <Navbar />;
}
