import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { z } from 'zod';
import { SearchApi } from '../models/search-api.model';

export class BookQueryDtoLegacy {
  @IsString()
  @IsNotEmpty()
  q!: string;

  @IsEnum(SearchApi)
  api!: string;
}
export const BookQueryScheme = z.object({
  q: z.string().nonempty(),
  api: z.nativeEnum(SearchApi),
});

export type BookQueryDto = z.infer<typeof BookQueryScheme>;

export class OpenLibQuery {
  q!: string; // Full-text query string
  limit?: number; // Max elements to return (Default: 10, Max: 40)
  page?: number; // Position to start the list of results (index starts at 0)
}

export class GoogleQuery {
  download?: 'epub'; // Only "epub" is supported
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks'; // Filter search results by volume type and availability
  langRestrict?: string; // Two-letter ISO-639-1 code (e.g., "en", "fr")
  maxResults?: number; // Max elements to return (Default: 10, Max: 40)
  orderBy?: 'relevance' | 'newest'; // Sort results
  printType?: 'all' | 'books' | 'magazines'; // Restrict to books or magazines
  projection?: 'full' | 'lite'; // Return a subset of fields https://developers.google.com/books/docs/v1/reference/volumes
  q?: string; // Full-text query string
  startIndex?: number; // Position to start the list of results (index starts at 0)
  volumeId?: string; // Identifies a volume associated with the request
}
