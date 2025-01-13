'use server';

import {
  TransientBookModel,
  TransientBookSchema,
} from '@libshary/shared-types';
import api from '@web/lib/nest-api';

export const searchBooks = async (
  query: string,
): Promise<TransientBookModel[]> => {
  const response = await api.get(`/books/search?q=${query}`);
  console.log(response.data);
  const books = response.data.map((book: TransientBookModel) =>
    TransientBookSchema.parse(book),
  );

  console.log({ books });
  return books;
};
