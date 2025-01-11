import { Link, usePathname } from '@web/i18n/routing';
import { ExploreIcon } from '../(icons)/ExploreIcon';
import { HighlightUi } from '../(ui)/HighlightUi';

export const ExploreNav = () => {
  const pathname = usePathname();
  const isExplorePage = pathname === '/explore';
  return (
    <HighlightUi on={isExplorePage}>
      <div className={`flex justify-center py-1`}>
        <Link href="/explore">
          <ExploreIcon />
        </Link>
      </div>
    </HighlightUi>
  );
};
