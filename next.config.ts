import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/task-manager',
  assetPrefix: '/task-manager',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
