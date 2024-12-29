import { ShelfBook } from './shelf_book';
import { ApiProperty } from '@nestjs/swagger';

export class PastReadShelfBook {
  @ApiProperty({ type: String })
  shelfBookId: string;

  @ApiProperty({ type: Number })
  rating: number;

  @ApiProperty({ type: () => ShelfBook })
  shelfBook: ShelfBook;
}
