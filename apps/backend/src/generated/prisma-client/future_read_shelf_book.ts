import { ShelfBook } from './shelf_book';
import { ApiProperty } from '@nestjs/swagger';

export class FutureReadShelfBook {
  @ApiProperty({ type: String })
  shelfBookId: string;

  @ApiProperty({ type: () => ShelfBook })
  shelfBook: ShelfBook;
}
