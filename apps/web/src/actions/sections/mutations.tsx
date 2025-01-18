'use server';

import {
  createSectionBookSchema,
  CreateSectionDto,
  createSectionSchema,
  updateSectionSchema,
} from '@libshary/shared-types';
import api from '@web/lib/api/nest-api';
import { ServerActionResponse } from '@web/lib/types/actionServerResponse';
import { revalidatePath } from 'next/cache';

export const createSection = async (
  shelfId: string,
  _prevState: unknown,
  formData: FormData,
): Promise<ServerActionResponse<null>> => {
  const name = formData.get('name');
  const description = formData.get('description');
  const parsedData = createSectionSchema.safeParse({
    shelfId,
    name,
  });

  if (!parsedData.success) {
    return {
      success: false,
      errorCode: 'VALIDATION_ERROR',
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
  if (response.status !== 201) {
    return {
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Error updating section',
    };
  }
  return { success: true };
};

export const deleteSection = async (
  id: string,
): Promise<ServerActionResponse<null>> => {
  const response = await api.delete(`/sections/${id}`);
  if (response.status !== 204 && response.status !== 200) {
    console.log({ response });
    return {
      success: false,
      message: 'Error deleting section',
      errorCode: 'SERVER_ERROR',
    };
  }
  revalidatePath('/home');
  return { success: true };
};

export const updateSection = async (
  id: string,
  _prevState: unknown,
  formData: FormData,
): Promise<ServerActionResponse<null>> => {
  const name = formData.get('name');
  const parsedData = updateSectionSchema.safeParse({
    name,
  });
  if (!parsedData.success) {
    return {
      success: false,
      errorCode: 'VALIDATION_ERROR',
      message: parsedData.error.errors
        .map((err) => err.path.join(', ').concat(err.message))
        .join(', '),
    };
  }
  const response = await api.patch(`/sections/${id}`, parsedData.data);
  if (response.status !== 200 && response.status !== 204) {
    return {
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Error updating section',
    };
  }
  revalidatePath('/home');
  return { success: true };
};

export const createSectionBook = async ({
  sectionId,
  googleBookId,
}: {
  sectionId: string;
  googleBookId: string;
}): Promise<ServerActionResponse<null>> => {
  const parsedData = createSectionBookSchema.safeParse({
    googleBookId,
  });
  if (!parsedData.success) {
    return {
      success: false,
      errorCode: 'VALIDATION_ERROR',
      message: parsedData.error.errors
        .map((err) => err.path.join(', ').concat(err.message))
        .join(', '),
    };
  }
  console.log({ sectionId, googleBookId });
  const response = await api.post(`/sections/${sectionId}/books`, {
    googleBookId,
  });
  if (response.status !== 201) {
    return {
      success: false,
      errorCode: 'SERVER_ERROR',
      message: 'Error updating section',
    };
  }
  revalidatePath('/home');
  return { success: true };
};
