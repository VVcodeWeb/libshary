'use server';
import { createShelfSchema } from '@libshary/shared-types';
import api from '@web/lib/nest-api';
import { revalidatePath } from 'next/cache';

export const createShelf = async (_prevState: unknown, formData: FormData) => {
  const name = formData.get('name');
  const description = formData.get('description');
  const privacy = formData.get('privacy');
  const color = formData.get('color');
  const parsedData = createShelfSchema.safeParse({
    name,
    description,
    private: privacy === 'on',
    color,
    defaultSections: true,
  });

  if (!parsedData.success) {
    return {
      message: parsedData.error.errors
        .map((err) => err.path.join(', ').concat(err.message))
        .join(', '),
    };
  }
  const res = await api.post('/shelves', {
    ...parsedData.data,
  });
  revalidatePath('/home');
  return { message: 'form submitted', result: res.data };
};
