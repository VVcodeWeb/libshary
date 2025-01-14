'use server';

import {
  BookQueryReponseDto,
  TransientBookModel,
  TransientBookSchema,
} from '@libshary/shared-types';
import api from '@web/lib/nest-api';

export const searchBooks = async (
  query: string,
): Promise<TransientBookModel[]> => {
  const response = await api.get(`/books/search?q=${query}`);
  const data = response?.data as BookQueryReponseDto;
  if (data.total_number === 0) return [];
  const books = data.result.map((book: TransientBookModel) =>
    TransientBookSchema.parse(book),
  );

  console.log({ books });
  return books;
};
