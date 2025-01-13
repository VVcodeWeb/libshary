'use server';

import { createSectionBookSchema } from '@libshary/shared-types';
import api from '@web/lib/nest-api';
import { revalidatePath } from 'next/cache';

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
