'use server';

import api from '@web/lib/nest-api';
import { AxiosError } from 'axios';
import { BookWithSection, ShelfWithSections } from '@bookshary/shared-types';
import { Section, Shelf } from '@prisma/client';

export const getShelfs = async (): Promise<
  ShelfWithSections[] | { error: string }
> => {
  try {
    const res = await api.get('/shelves');
    // console.log({ res: res.data });
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
    console.log({ resOne: res.data });
    return res.data;
  } catch (error) {
    console.log({ error });
    if (error instanceof AxiosError) {
      return { error: error.response?.data.message };
    }
    return { error: 'Unknow server error' };
  }
};
