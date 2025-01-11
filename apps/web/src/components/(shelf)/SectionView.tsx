import { BookWithSection } from '@bookshary/shared-types';
import { Section } from '@prisma/client';
import Image from 'next/image';
import { SectionHeader } from './SectionHeader';

type SectionViewProps = {
  section: Section;
  books: BookWithSection[];
};
export const SectionView = ({ section, books }: SectionViewProps) => {
  return (
    <div>
      <SectionHeader
        booksCount={books.length}
        name={section.name}
        id={section.id}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {books.map((book) => (
          <div key={book.id} className="card shadow-lg bg-base-300 w-full">
            <figure className="relative h-60 w-full">
              <Image
                src={book.imageLinks || '/placeholder.jpg'}
                alt={`${book.title} cover`}
                layout="fill"
                objectFit="contain"
                className="rounded-t-lg"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-500">{book.authors.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
