import { z } from 'zod';

export const createSectionSchema = z.object({
  name: z.string(),
  shelfId: z.string(),
});

export type CreateSectionDto = z.infer<typeof createSectionSchema>;

export const updateSectionSchema = z.object({
  name: z.string().optional(),
  shelfId: z.string().optional(),
});

export type UpdateSectionDto = z.infer<typeof updateSectionSchema>;
