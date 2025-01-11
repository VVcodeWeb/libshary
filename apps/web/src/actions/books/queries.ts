'use server';

import {
  TransientBookModel,
  TransientBookSchema,
} from '@bookshary/shared-types';
import api from '@web/lib/nest-api';

export const searchBooks = async (
  query: string,
): Promise<TransientBookModel[]> => {
  const response = await api.get(`/books/search?q=${query}`);
  const books = response.data.map((book: TransientBookModel) =>
    TransientBookSchema.parse(book),
  );

  console.log({ books });
  return books;
};
