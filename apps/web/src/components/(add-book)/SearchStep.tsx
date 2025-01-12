'use client';
import { useState } from 'react';
import { BookSearchItem } from './BookSearchItem';
import { useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { searchBooks } from '@web/actions/books/queries';
import { TransientBookModel } from '@bookshary/shared-types';

export const SearchStep = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [results, setResults] = useState<TransientBookModel[]>([]);

  const { data, updateData, navigateToStep } = useAddBookSteps();
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && searchValue.trim()) {
      const response = await searchBooks(searchValue);
      setResults(response);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onBookSelect = (id: string) => {
    const googleBook = results.find((book) => book.googleBookId === id);
    if (!googleBook)
      throw new Error("Can't find the book id among results from api");
    updateData({ book: googleBook });
  };

  const onContinueClick = () => {
    navigateToStep('details');
  };
  return (
    <div>
      <p className="text-2xl font-bold">Lets find a book!</p>
      <div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            value={searchValue}
            className="grow"
            placeholder="Search"
            onChange={onChange}
            onKeyDown={handleKeyPress}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="flex flex-col gap-4 p-4 rounded-lg shadow">
          {results &&
            results.map((book) => {
              if (!book) {
                console.log({ book });
                return null;
              }
              return (
                <BookSearchItem
                  key={book.googleBookId}
                  onSelect={onBookSelect}
                  isSelected={data.book?.googleBookId === book.googleBookId}
                  book={book}
                />
              );
            })}
        </div>
      </div>
      <div className="modal-action">
        <button
          className="btn btn-primary"
          disabled={!data.book?.googleBookId}
          onClick={onContinueClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
