import { HighlightUi } from '@libshary/ui/components/HighlightUi';
import { ExploreIcon } from '@libshary/ui/icons';
import { Link, usePathname } from '@web/lib/i18n/routing';

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
