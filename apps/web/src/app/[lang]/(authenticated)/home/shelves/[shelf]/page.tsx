import { getShelfDataById } from '@web/actions/shelves/queries';
import { SectionList } from '@web/components/(shelf)/SectionList';
import { ShelfContent } from '@web/components/(shelf)/ShelfContent';
import { ShelfHeader } from '@web/components/(shelf)/ShelfHeader';
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
      <ShelfHeader shelf={shelf} />
      <ShelfContent books={books} sections={sections} />
    </div>
  );
}
