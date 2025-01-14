import { number, z } from 'zod';
import { SearchApi } from '../models/search-api.model';
import { TransientBookSchema } from '../models';
export const BookQueryRequestSchema = z.object({
  q: z.string().nonempty(),
  api: z.nativeEnum(SearchApi).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  bookId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type BookQueryRequestDto = z.infer<typeof BookQueryRequestSchema>;

export const BookQueryReponseSchema = z.object({
  api_provider: z.nativeEnum(SearchApi),
  total_number: z.number(),
  limit: z.number(),
  offset: z.number(),
  result: z.array(TransientBookSchema),
});
export type BookQueryReponseDto = z.infer<typeof BookQueryReponseSchema>;
