import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'books.google.com',
        port: '',
        pathname: '/books/content/**',
      },
      {
        protocol: 'https',
        hostname: 'books.google.com',
        port: '',
        pathname: '/books/content/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
};

const plugins = [withNx, withNextIntl];
export default composePlugins(...plugins)(nextConfig);
