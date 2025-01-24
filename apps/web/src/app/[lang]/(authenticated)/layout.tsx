import { ShelvesSidebar_Query } from '@web/actions/shelves/queries';
import { Sidebar } from '@web/components/sidebar/SideBar';
import { PreloadQuery } from '@web/lib/apollo/client';

export default async function ShelvesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PreloadQuery query={ShelvesSidebar_Query}>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-grow bg-base-100">{children}</div>
      </div>
    </PreloadQuery>
  );
}
