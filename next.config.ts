import type { NextConfig } from "next";

const nextConfig: NextConfig ={
  reactStrictMode: true,
  // swcMinify: true,
  // Show more detailed errors
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.optimization.minimize = false;
    }
    return config;
  },
}

export default nextConfig;
