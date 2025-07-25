import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@/components/ui'],
  },
  // Help prevent hydration issues
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
