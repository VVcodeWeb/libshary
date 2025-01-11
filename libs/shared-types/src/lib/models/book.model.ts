import { z, ZodType } from 'zod';

interface BookModelInterface {
  title: string;
  authors: string[];
  description?: string;
  publishedAt?: Date;
  pageCount?: number;
  imageLinks?: string;
  isbn10?: string;
  isbn13?: string;
  categories?: string[];
  publisher?: string;
  googleBookId?: string;
}

export const TransientBookSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  description: z.string().optional(),
  publishedAt: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  pageCount: z.number().optional(),
  imageLinks: z.string().optional(),
  isbn10: z.string().optional(),
  isbn13: z.string().optional(),
  categories: z.array(z.string()).optional(),
  publisher: z.string().optional(),
  googleBookId: z.string().optional(),
});

export type TransientBookModel = z.infer<typeof TransientBookSchema>;
