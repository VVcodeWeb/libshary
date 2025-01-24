import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { isValidLocale, importLocale } from '@libshary/i18n';

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
