'use client';
import { FragmentType, gql, useFragment } from '@web/__generated__';
import Image from 'next/image';

export const BookSearchItem_QueryFragment = gql(`
  fragment BookSearchItem_QueryFragment on BookModel {
    title
    authors
    publishedAt
    publisher
    imageLinks
    googleBookId
  }
  `);
interface BookItem {
  book: FragmentType<typeof BookSearchItem_QueryFragment>;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}
export const BookSearchItem = (props: BookItem) => {
  const { onSelect, isSelected } = props;
  const book = useFragment(BookSearchItem_QueryFragment, props.book);
  const onClick = () => onSelect && onSelect(book.googleBookId as string);

  return (
    <div
      className={`hero bg-base-200 ${
        isSelected
          ? 'bg-primary text-primary-content border-2 border-primary'
          : ''
      }`}
      onClick={onClick}
    >
      <div className="hero-content flex-col justify-start lg:flex-row text-left w-full">
        {/* TODO: handle missing image link */}
        <Image
          src={book.imageLinks ?? '/spiderman.webp'}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="book cover"
          width={64}
          height={64}
        />
        <div className="flex-col ">
          <div>
            <p className="font-bold">{book.title}</p>
          </div>
          <div>
            <p>Author: {book.authors && [...book.authors]}</p>
          </div>
          {book.publishedAt && (
            <div>
              <p>Published: {book.publishedAt}</p>
            </div>
          )}
          {book.publisher && (
            <div>
              <p>Publisher: {book.publisher}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
