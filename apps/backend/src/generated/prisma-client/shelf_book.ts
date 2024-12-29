import { Shelf } from './shelf';
import { Book } from './book';
import { InProgressShelfBook } from './in_progress_shelf_book';
import { FutureReadShelfBook } from './future_read_shelf_book';
import { PastReadShelfBook } from './past_read_shelf_book';
import { Status } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShelfBook {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  shelfId: string;

  @ApiProperty({ type: String })
  bookId: string;

  @ApiProperty({ type: () => Shelf })
  shelf: Shelf;

  @ApiProperty({ type: () => Book })
  book: Book;

  @ApiProperty({ enum: Status, enumName: 'Status' })
  status: Status;

  @ApiPropertyOptional({ type: () => InProgressShelfBook })
  inProgressShelfBook?: InProgressShelfBook;

  @ApiPropertyOptional({ type: () => FutureReadShelfBook })
  futureReadShelfBook?: FutureReadShelfBook;

  @ApiPropertyOptional({ type: () => PastReadShelfBook })
  pastReadShelfBook?: PastReadShelfBook;
}
