'use client';
import { SectionHeader } from './SectionHeader';
import { BookCard } from '../../books/BookCard';
import { AddBookCard } from './AddBookCard';
import { cn } from '@libshary/ui/utils';
import { FragmentType, gql, useFragment } from '@web/__generated__';

export const SectionView_SectionFragment = gql(`
  fragment SectionView_SectionFragment on SectionModel {
    id
    name
    books {
      id
      book {
        ...BookCard_BookFragment
      }
    }
  }
`);
type SectionViewProps = {
  section: FragmentType<typeof SectionView_SectionFragment>;
};

export const SectionView = (props: SectionViewProps) => {
  const section = useFragment(SectionView_SectionFragment, props.section);
  if (!section) return <div>Not found</div>;
  return (
    <div className="w-full bg-neutral p-4 mb-4 rounded-lg shadow-md flex flex-col">
      <SectionHeader
        booksCount={section.books.length}
        name={section.name}
        id={section.id}
      />
      <div
        className={cn(
          'grid gap-4 flex-grow',
          'grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]',
        )}
      >
        {section.books.map((sectionBook) => (
          <BookCard book={sectionBook.book} key={sectionBook.id} />
        ))}
        <AddBookCard sectionId={section.id} />
      </div>
    </div>
  );
};
