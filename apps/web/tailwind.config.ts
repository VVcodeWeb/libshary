/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
  theme: {
    extend: {
      width: {
        sidebar: '18rem', // 72 in Tailwind (18 * 16px = 288px)
        'sidebar-collapsed': '4rem', // 20 in Tailwind (5 * 16px = 80px)
      },
      minWidth: {
        sidebar: '18rem',
        'sidebar-collapsed': '4rem',
      },
      height: {
        header: '3.5rem' /* 56px */,
      },
    },
  },
} satisfies Config;
