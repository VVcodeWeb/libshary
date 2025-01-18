'use client';
import { BookWithSection } from '@libshary/shared-types';
import { Section } from '@prisma/client';
import { SectionHeader } from './SectionHeader';
import { BookCard } from '../../books/BookCard';
import { AddBookCard } from './AddBookCard';
import { cn } from '@web/lib/utils';

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
        className={cn(
          'grid gap-4 flex-grow',
          'grid-cols-[repeat(auto-fill,minmax(11rem,1fr))]',
        )}
      >
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
        <AddBookCard sectionId={section.id} />
      </div>
    </div>
  );
};
