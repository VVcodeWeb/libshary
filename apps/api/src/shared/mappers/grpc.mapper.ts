import { BookModel } from '@api/modules/books/models/book.model';
import { SearchApi, TransientBook } from '@libshary/grpc/generated/booksearch';

export const transientBookToBook = (
  book: TransientBook,
): Omit<BookModel, 'id'> => {
  return {
    googleBookId: book.googleBookId,
    title: book.title,
    authors: book.authors,
    description: book.description,
    publishedAt: book.publishedAt ? new Date(book.publishedAt) : null,
    publisher: book.publisher,
    pageCount: book.pageCount,
    categories: book.categories,
    imageLinks: book.imageLinks,
    isbn10: book.isbn10,
    isbn13: book.isbn13,
  };
};

export const searchApiToProviderName = (api: SearchApi): string => {
  switch (api) {
    case SearchApi.OPENLIB:
      return 'Open Library';
    case SearchApi.UNRECOGNIZED:
      return 'Unknown';
    default:
      return 'Google Books';
  }
};
