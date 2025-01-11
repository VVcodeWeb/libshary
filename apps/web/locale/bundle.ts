export const importLocale = async (locale: string) => {
  const [landing, common] = await Promise.all([
    import(`./${locale}/landing.json`).then((module) => module.default),
    import(`./${locale}/common.json`).then((module) => module.default),
  ]);
  return { landing, common };
};
