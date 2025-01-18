import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
//@typescript-eslint/no-require-imports
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { composePlugins, withNx } = require('@nx/next');

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
const nextConfig: NextConfig = {
  output: 'standalone',
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
