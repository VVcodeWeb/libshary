import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { isValidLocale } from './i18-config';
import { importLocale } from 'apps/web/locale/bundle';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await importLocale(locale),
  };
});
