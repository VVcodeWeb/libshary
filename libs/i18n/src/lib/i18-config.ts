export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ua'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
export const isValidLocale = (locale: string): locale is Locale => {
  return i18n.locales.includes(locale as Locale);
};

export const importLocale = async (locale: string) => {
  const [landing, common] = await Promise.all([
    import(`libs/i18n/src/locale/${locale}/landing.json`).then(
      (module) => module.default,
    ),
    import(`libs/i18n/src/locale/${locale}/common.json`).then(
      (module) => module.default,
    ),
  ]);
  return { landing, common };
};
