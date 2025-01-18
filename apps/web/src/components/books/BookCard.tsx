import { BookWithSection } from '@libshary/shared-types';
import Image from 'next/image';

type BookCardProps = {
  book: BookWithSection;
};

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="card shadow-lg bg-base-300 w-44 h-80">
      <figure className="relative w-44 h-60">
        <Image
          fill
          src={book.imageLinks || '/placeholder.jpg'}
          alt={`${book.title} cover`}
        />
      </figure>
      <div className="card-body p-2">
        <article className="prose-base prose font-semibold truncate ">
          {book.title}
        </article>
        <article className="prose-sm prose prose-zinc truncate">
          {book.authors.join(', ')}
        </article>
      </div>
    </div>
  );
};
