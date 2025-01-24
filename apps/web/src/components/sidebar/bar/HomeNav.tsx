'use client';
import { HighlightUi } from '@libshary/ui/components/HighlightUi';
import { HomeIcon } from '@libshary/ui/icons';
import { Link, usePathname } from '@web/lib/i18n/routing';

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
