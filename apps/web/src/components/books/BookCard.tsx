import { FragmentType, gql, useFragment } from '@web/__generated__';
import Image from 'next/image';

export const BookCard_BookFragment = gql(`
    fragment BookCard_BookFragment on BookModel {
      id
      title
      authors
      description
      publisher
      pageCount
      imageLinks
      isbn10
      isbn13
      googleBookId
      categories
    }
  `);
type BookCardProps = {
  book: FragmentType<typeof BookCard_BookFragment>;
};

export const BookCard = (props: BookCardProps) => {
  const book = useFragment(BookCard_BookFragment, props.book);
  if (!book) return <div>Not found</div>;
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
