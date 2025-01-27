'use client';
import { useSuspenseQuery } from '@apollo/client';
import { ShelfContent } from './ShelfContent';
import { ShelfHeader } from './ShelfHeader';
import { ShelfPage_Query } from '@web/actions/shelves/queries';
import { notFound } from 'next/navigation';

interface ShelfPageContentProps {
  shelfId: string;
}
export const ShelfPageContent = ({ shelfId }: ShelfPageContentProps) => {
  const { data, error } = useSuspenseQuery(ShelfPage_Query, {
    variables: { id: shelfId },
  });

  if (error) return <div>Error</div>;
  if (!data?.findShelf) return notFound();
  return (
    <div className="min-h-screen w-full">
      <ShelfHeader shelf={data.findShelf} />
      <ShelfContent shelf={data.findShelf} />
    </div>
  );
};
