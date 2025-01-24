import { gql } from '@web/__generated__';
import { ShelfPage_Query } from '@web/actions/shelves/queries';
import { ShelfPageContent } from '@web/components/shelf/ShelfPageContent';
import { PreloadQuery } from '@web/lib/apollo/client';
// rgb(238, 238, 238)

export default async function ShelfPage({
  params,
}: {
  params: Promise<{ shelf: string }>;
}) {
  const shelfId = (await params).shelf;
  return (
    <PreloadQuery query={ShelfPage_Query} variables={{ id: shelfId }}>
      <div className="min-h-screen w-full">
        <ShelfPageContent shelfId={shelfId} />
      </div>
    </PreloadQuery>
  );
}
