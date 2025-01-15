'use server';

import {
  createSectionBookSchema,
  CreateSectionDto,
  createSectionSchema,
} from '@libshary/shared-types';
import api from '@web/lib/nest-api';
import { revalidatePath } from 'next/cache';

export const createSection = async (
  shelfId: string,
  _prevState: unknown,
  formData: FormData,
) => {
  const name = formData.get('name');
  const description = formData.get('description');
  const parsedData = createSectionSchema.safeParse({
    shelfId,
    name,
  });

  if (!parsedData.success) {
    return {
      message: parsedData.error.errors
        .map((err) => err.path.join(', ').concat(err.message))
        .join(', '),
    };
  }
  const response = await api.post(`/sections`, {
    shelfId,
    name,
  });
  console.log({ response: response.status });
  revalidatePath('/home');

  return { success: response.status === 201 };
};

export const createSectionBook = async ({
  sectionId,
  googleBookId,
}: {
  sectionId: string;
  googleBookId: string;
}) => {
  const parsedData = createSectionBookSchema.safeParse({
    googleBookId,
  });
  if (!parsedData.success) {
    return {
      message: parsedData.error.errors
        .map((err) => err.path.join(', ').concat(err.message))
        .join(', '),
    };
  }
  console.log({ sectionId, googleBookId });
  const response = await api.post(`/sections/${sectionId}/books`, {
    googleBookId,
  });
  console.log({ response });
  revalidatePath('/home');

  return { success: response.status === 201 };
};
