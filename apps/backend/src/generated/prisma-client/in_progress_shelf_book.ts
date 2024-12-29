import { ShelfBook } from './shelf_book';
import { ApiProperty } from '@nestjs/swagger';

export class InProgressShelfBook {
  @ApiProperty({ type: String })
  shelfBookId: string;

  @ApiProperty({ type: Number })
  currentPage: number;

  @ApiProperty({ type: () => ShelfBook })
  shelfBook: ShelfBook;
}
