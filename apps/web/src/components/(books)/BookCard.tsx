import { BookWithSection } from '@libshary/shared-types';
import Image from 'next/image';

type BookCardProps = {
  book: BookWithSection;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="card shadow-lg bg-base-300 w-full">
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
  );
};
