/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleBooksVolume } from "@/utils/types";
import { testData } from "@/utils/test-data";
import { useState } from "react";
import { BookItem } from "./book-item";
import { AddBookData, useAddBookSteps } from "@/hooks/useAddBookSteps";
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export const SearchStep = () => {
  const [value, setValue] = useState<string>("");
  const [results, setResults] = useState<GoogleBooksVolume[]>([]);

  const { data, updateData, navigateToStep } = useAddBookSteps();

  //TODO: implement via backend
  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && value.trim()) {
      console.log("Enter key pressed with text:", value);
      setResults(testData);
      //   try {
      //     const response = await fetch(
      //       `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(value)}&key=${
      //         process.env.NEXT_PUBLIC_GOOGLE_API_KEY
      //       }`
      //     );

      //     if (!response.ok) {
      //       throw new Error(`Error: ${response.statusText}`);
      //     }

      //     const data = await response.json();
      //     console.log(data);
      //     setResults(data.items || []);
      //     setError(null);
      //   } catch (err: any) {
      //     setError(err.message || "An unknown error occurred.");
      //   } finally {
      //     setValue("");
      //   }
      // }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const googleBookDTO = (book: GoogleBooksVolume): AddBookData => {
    return {
      imageLink: book.volumeInfo.imageLinks?.thumbnail,
      title: book.volumeInfo.title,
      id: book.id,
      authors: book.volumeInfo.authors,
      pageCount: book.volumeInfo.pageCount,
      publihedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
    };
  };

  //TODO: remake once backend is implemented
  const onBookSelect = (id: string) => {
    const googleBook = results.find((book) => book.id === id);
    if (!googleBook)
      throw new Error("Can't find the book id among results from api");
    const book = googleBookDTO(googleBook);
    updateData(book);
  };

  const onContinueClick = () => {
    navigateToStep("details");
  };
  return (
    <div>
      <p className="text-2xl font-bold">Lets find a book!</p>
      <div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            value={value}
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
          {results.map((result) => {
            return (
              <BookItem
                key={result.id}
                onSelect={onBookSelect}
                isSelected={data.id === result.id}
                book={googleBookDTO(result)}
              />
            );
          })}
        </div>
      </div>
      <div className="modal-action">
        <button
          className="btn btn-primary"
          disabled={!Boolean(data.id)}
          onClick={onContinueClick}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
