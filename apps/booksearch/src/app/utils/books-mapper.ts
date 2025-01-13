import {
  TransientBookModel,
  TransientBookSchema,
} from '@libshary/shared-types';
import { GoogleBooksVolume } from '../dto/google-books';
import { OpenLibBook } from '../dto/openlib-books';

export const googleToTransientBook = (
  googleBook: GoogleBooksVolume,
): TransientBookModel => {
  const getISBN = (type: 'ISBN_10' | 'ISBN_13') => {
    return googleBook.volumeInfo.industryIdentifiers?.find(
      (id) => id.type === type,
    )?.identifier;
  };
  const obj = {
    title: googleBook.volumeInfo.title,
    authors: googleBook.volumeInfo.authors ?? [],
    description: googleBook.volumeInfo.description,
    publishedAt: googleBook.volumeInfo.publishedDate,
    pageCount: googleBook.volumeInfo.pageCount,
    imageLinks: googleBook.volumeInfo.imageLinks?.thumbnail,
    isbn10: getISBN('ISBN_10'),
    isbn13: getISBN('ISBN_13'),
    publisher: googleBook.volumeInfo.publisher,
    categories: googleBook.volumeInfo.categories,
    googleBookId: googleBook.id,
  };
  return TransientBookSchema.parse(obj);
};

export const openLibBookToBook = (
  openLibBook: OpenLibBook,
): TransientBookModel => {
  return {
    title: 'not implemented',
    authors: [],
  };
  // return {
  //   title: openLibBook.title,
  //   authors: openLibBook.author_name,
  //   description: '', // Open Library does not provide a description
  //   publishedAt: new Date(openLibBook.first_publish_year),
  //   pageCount: openLibBook.number_of_pages_median,
  //   imageLinks: openLibBook.cover_i
  //   isbn10: openLibBook.identifiers.isbn_10
  //     ? openLibBook.identifiers.isbn_10[0]
  //     : null,
  //   isbn13: openLibBook.identifiers.isbn_13
  //     ? openLibBook.identifiers.isbn_13[0]
  //     : null,
  //   publisher: openLibBook.
  //   categories: openLibBook.subjects
  // };
};
