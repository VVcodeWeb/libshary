import { AddBookData } from "@/hooks/useAddBookSteps";
import Image from "next/image";
type BookItem = {
  book: AddBookData;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
};
export const BookItem = ({ onSelect, book, isSelected }: BookItem) => {
  const onClick = () => onSelect && onSelect(book.id);

  return (
    <div
      className={`hero bg-base-200 ${
        isSelected
          ? "bg-primary text-primary-content border-2 border-primary"
          : ""
      }`}
      onClick={onClick}
    >
      <div className="hero-content flex-col justify-start lg:flex-row text-left w-full">
        {/* TODO: handle missing image link */}
        <Image
          src={book.imageLink ?? "/spiderman.webp"}
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
          <div>
            <p>Published: {book.publihedDate}</p>
          </div>
          <div>
            <p>Publisher: {book.publisher}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
