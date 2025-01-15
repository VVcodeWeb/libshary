import { BookWithSection } from '@libshary/shared-types';
import { Section } from '@prisma/client';
import { SectionHeader } from './SectionHeader';
import { BookCard } from '../(books)/BookCard';
import clsx from 'clsx';
import { NoBooksCard } from './NoBooksCard';

type SectionViewProps = {
  section: Section;
  books: BookWithSection[];
};

export const SectionView = ({ section, books }: SectionViewProps) => {
  return (
    <div className="w-full bg-neutral p-4 mb-4 rounded-lg shadow-md flex flex-col">
      <SectionHeader
        booksCount={books.length}
        name={section.name}
        id={section.id}
      />
      <div
        className={clsx(
          'grid gap-4 flex-grow',
          'grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6',
        )}
      >
        {books.length > 0 ? (
          books.map((book) => <BookCard book={book} key={book.id} />)
        ) : (
          <div>
            <NoBooksCard sectionId={section.id} />
          </div>
        )}
      </div>
    </div>
  );
};
