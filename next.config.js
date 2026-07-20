/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization re-enabled — was disabled, causing all images to load
  // at full resolution with no WebP conversion or lazy loading.
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  // Tree-shake large icon and animation libraries — eliminates dead code from client bundles
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion'],
  },
};

module.exports = nextConfig;
