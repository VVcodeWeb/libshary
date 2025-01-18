'use client';
import { Link, usePathname } from '@web/lib/i18n/routing';
import { HomeIcon } from '../icons/HomeIcon';
import { HighlightUi } from '../ui/HighlightUi';

export const HomeNav = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/home';
  console.log({ pathname });
  return (
    <HighlightUi on={isHomePage}>
      <div className={`flex justify-center py-1`}>
        <Link href="/home">
          <HomeIcon />
        </Link>
      </div>
    </HighlightUi>
  );
};
