/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: false,
  },

  webpack: (config: import('webpack').Configuration, { dev }: { dev: boolean }) => {
    if (dev) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      config.optimization && (config.optimization.minimize = false);
    }
    return config;
  },
};

module.exports = nextConfig;
