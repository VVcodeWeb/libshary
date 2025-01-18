'use server';
import api from '@web/lib/api/nest-api';
import { AxiosError } from 'axios';
import { BookWithSection, ShelfWithSections } from '@libshary/shared-types';
import { Section, Shelf } from '@prisma/client';

export const getShelfs = async (): Promise<
  ShelfWithSections[] | { error: string }
> => {
  try {
    const res = await api.get('/shelves');
    return res.data as ShelfWithSections[];
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      return { error: error.response?.data.message };
    }
    return { error: 'Unknow server error' };
  }
};

export const getShelfDataById = async (
  id: string,
): Promise<
  | { shelf: Shelf; sections: Section[]; books: BookWithSection[] }
  | { error: string }
> => {
  try {
    const res = await api.get(`/shelves/${id}?includeAll=true`);
    return res.data;
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      return { error: error.response?.data.message };
    }
    return { error: 'Unknow server error' };
  }
};
