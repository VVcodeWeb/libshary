'use client';
import { TransientBookModel } from '@bookshary/shared-types';
import Image from 'next/image';
type BookItem = {
  book: TransientBookModel;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
};
export const BookSearchItem = ({ onSelect, book, isSelected }: BookItem) => {
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
              <p>Published: {book.publishedAt?.getFullYear()}</p>
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
