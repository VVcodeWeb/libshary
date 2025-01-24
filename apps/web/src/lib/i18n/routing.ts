import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { i18n } from '@libshary/i18n';

export const routing = defineRouting({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
