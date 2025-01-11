import { getShelfDataById } from '@web/actions/shelves/queries';
import { SectionList } from '@web/components/(shelf)/SectionList';
import { ShelfItem } from '@web/components/(shelf)/ShelfItem';
// rgb(238, 238, 238)

export default async function ShelfPage({
  params,
}: {
  params: Promise<{ shelf: string }>;
}) {
  const shelfId = (await params).shelf;
  const shelfData = await getShelfDataById(shelfId);
  if ('error' in shelfData) return <div>Error</div>;
  const { shelf, sections, books } = shelfData;
  return (
    <div className="min-h-screen w-full">
      <div className="pl-6 p-2 flex items-center border-b border-primary h-12 ">
        <ShelfItem shelf={shelf} containerClass="flex-2" />
        <div className="min-w-0 flex-1"></div>
      </div>
      <div className="p-3">
        <SectionList books={books} sections={sections} />
      </div>
    </div>
  );
}
