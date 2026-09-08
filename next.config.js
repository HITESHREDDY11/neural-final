/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Compress output with gzip for faster transfer
  compress: true,
  // Use SWC-based minifier (faster than Terser)
  swcMinify: true,
  // Image optimization — WebP/AVIF conversion + responsive sizes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
  },
  // Aggressive HTTP cache headers for all static assets
  // After the first visit, everything loads from disk — zero network cost
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  experimental: {
    // Tree-shake large icon and animation libraries + all Radix UI packages
    // This eliminates unused component code from every page's client bundle
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-select',
      '@radix-ui/react-popover',
    ],
  },
};

module.exports = nextConfig;
