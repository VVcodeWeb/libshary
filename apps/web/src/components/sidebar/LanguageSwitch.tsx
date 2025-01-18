'use client';

import { routing, usePathname, useRouter } from '@web/lib/i18n/routing';
import { LanguageIcon } from '../icons/LanguageIcon';
import { useTransition } from 'react';
import { Locale } from '@web/lib/i18n/i18-config';
import { useLocale } from 'next-intl';
import { Dropdown } from '../ui/Dropdown';
import { HighlightUi } from '../ui/HighlightUi';

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
