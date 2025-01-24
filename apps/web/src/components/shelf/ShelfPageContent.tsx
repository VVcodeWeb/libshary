'use client';
import { useQuery } from '@apollo/client';
import { ShelfContent } from './ShelfContent';
import { ShelfHeader } from './ShelfHeader';
import { ShelfPage_Query } from '@web/actions/shelves/queries';

interface ShelfPageContentProps {
  shelfId: string;
}
export const ShelfPageContent = ({ shelfId }: ShelfPageContentProps) => {
  const { data, error } = useQuery(ShelfPage_Query, {
    variables: { id: shelfId },
  });

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  if (!data.findShelf) return <div>Shelf not found</div>;
  return (
    <div className="min-h-screen w-full">
      <ShelfHeader shelf={data.findShelf} />
      <ShelfContent shelf={data.findShelf} />
    </div>
  );
};
