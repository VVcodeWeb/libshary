import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { isValidLocale } from './i18-config';

export const importLocale = async (locale: string) => {
  const [landing, common] = await Promise.all([
    import(`apps/web/locale/${locale}/landing.json`).then(
      (module) => module.default,
    ),
    import(`apps/web/locale/${locale}/common.json`).then(
      (module) => module.default,
    ),
  ]);
  return { landing, common };
};

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
