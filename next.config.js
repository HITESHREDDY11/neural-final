/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Compress output with gzip for faster transfer
  compress: true,
  // Use SWC-based minifier (faster than Terser)
  swcMinify: true,
  // Static export serves optimized images directly without requiring a serverless Node.js backend
  images: {
    unoptimized: true,
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

