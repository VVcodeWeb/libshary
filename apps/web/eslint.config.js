import baseConfig from '../../eslint.config.js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...baseConfig,
  {
    ignores: ['.next/', 'eslint.config.js'],
  },
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/display-name': 'off',
    },
  },
];
