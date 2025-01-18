'use server';
import { createShelfSchema } from '@libshary/shared-types';
import api from '@web/lib/api/nest-api';
import { revalidatePath } from 'next/cache';
import { updateShelfSchema } from '@libshary/shared-types';
import { ServerActionResponse } from '@web/lib/types/actionServerResponse';

export const createShelf = async (
  _prevState: unknown,
  formData: FormData,
): Promise<ServerActionResponse<null>> => {
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
      success: false,
      errorCode: 'VALIDATION_ERROR',
    };
  }
  const response = await api.post('/shelves', {
    ...parsedData.data,
  });
  if (response.status !== 201) {
    return {
      success: false,
      message: 'Error creating shelf',
      errorCode: 'SERVER_ERROR',
    };
  }
  revalidatePath('/home');
  return { success: true };
};

export const updateShelf = async (
  id: string,
  _prevState: unknown,
  formData: FormData,
): Promise<ServerActionResponse<null>> => {
  const name = formData.get('name');
  const description = formData.get('description');
  const privacy = formData.get('privacy');
  const color = formData.get('color');

  const parsedData = updateShelfSchema.safeParse({
    name,
    description,
    private: privacy ? privacy === 'on' : undefined,
    color,
  });

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors
        .map((err) => err.path.join(', ').concat(err.message))
        .join(', '),
      errorCode: 'VALIDATION_ERROR',
    };
  }
  const response = await api.patch(`/shelves/${id}`, {
    ...parsedData.data,
  });
  if (response.status !== 200 && response.status !== 204) {
    return {
      success: false,
      message: 'Error updating shelf',
      errorCode: 'SERVER_ERROR',
    };
  }
  revalidatePath('/home');
  return { success: true };
};

export const deleteShelf = async (
  id: string,
): Promise<ServerActionResponse<null>> => {
  const response = await api.delete(`/shelves/${id}`);
  if (response.status !== 200 && response.status !== 204) {
    return {
      success: false,
      message: 'Error deleting shelf',
      errorCode: 'SERVER_ERROR',
    };
  }
  revalidatePath('/home');
  return { success: true };
};
