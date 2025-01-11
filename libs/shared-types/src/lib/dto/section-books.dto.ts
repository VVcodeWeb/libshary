import { z } from 'zod';

export const createSectionBookSchema = z.object({
  googleBookId: z.string(),
});

export type CreateSectionBookDto = z.infer<typeof createSectionBookSchema>;

export const updateSectionBookSchema = z.object({
  newSectionId: z.string(),
});

export type UpdateSectionBookDto = z.infer<typeof updateSectionBookSchema>;
