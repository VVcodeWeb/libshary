import { z } from 'zod';

export const createShelfSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  private: z.boolean(),
  color: z.string(),
  defaultSections: z.boolean(),
});

export type CreateShelfDto = z.infer<typeof createShelfSchema>;

export const updateShelfSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  private: z.boolean().optional(),
  color: z.string().optional(),
});

export type UpdateShelfDto = z.infer<typeof updateShelfSchema>;

export const shelfQuerySchema = z.object({
  includeAll: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
});
