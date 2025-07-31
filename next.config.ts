import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'placehold.co',
      'img.icons8.com',
      'cdn-icons-png.flaticon.com',
      'cdn-icons-png.flaticon.com',
    ],
  },
  // devIndicators: false,
};

export default nextConfig;
