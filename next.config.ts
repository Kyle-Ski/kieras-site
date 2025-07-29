import type { NextConfig } from "next";

const hostNames = ['cdn.sanity.io', 'images.gr-assets.com']

const nextConfig: NextConfig = {
  images: {
    remotePatterns: hostNames.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
  experimental: {
    optimizeCss: true
  }
};

export default nextConfig;
