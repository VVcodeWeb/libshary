import { ShelfBook } from './shelf_book';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Book {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ isArray: true, type: String })
  authors: string[];

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiPropertyOptional({ type: Date })
  publishedAt?: Date;

  @ApiPropertyOptional({ type: String })
  publisher?: string;

  @ApiPropertyOptional({ type: Number })
  pageCount?: number;

  @ApiPropertyOptional({ type: String })
  imageLinks?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ isArray: true, type: () => ShelfBook })
  shelves: ShelfBook[];
}
