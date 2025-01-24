'use client';

import { routing, usePathname, useRouter } from '@web/lib/i18n/routing';
import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Locale } from '@libshary/i18n';
import { Dropdown, HighlightUi } from '@libshary/ui/components';
import { LanguageIcon } from '@libshary/ui/icons';

export const LanguageSwitch = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const onSelect = (newLocale: Locale) => {
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  };

  return (
    <Dropdown>
      <Dropdown.Button>
        <LanguageIcon />
      </Dropdown.Button>
      <Dropdown.Menu>
        {routing.locales.map((locale) => {
          const isCurrent = locale === currentLocale;
          return (
            <HighlightUi on={isCurrent} key={locale}>
              <div
                className="p-3 cursor-pointer"
                onClick={() => !isCurrent && !isPending && onSelect(locale)}
              >
                {locale}
              </div>
            </HighlightUi>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
