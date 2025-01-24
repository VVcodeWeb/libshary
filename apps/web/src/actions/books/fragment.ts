import { gql } from '@web/__generated__';

export const BOOK_FRAGMENT = gql(`
    fragment BookFragment on BookModel {
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
