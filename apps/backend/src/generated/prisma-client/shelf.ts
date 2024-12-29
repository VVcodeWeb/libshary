import { User } from './user';
import { ShelfBook } from './shelf_book';
import { ApiProperty } from '@nestjs/swagger';

export class Shelf {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  ownerId: string;

  @ApiProperty({ type: () => User })
  owner: User;

  @ApiProperty({ isArray: true, type: () => ShelfBook })
  books: ShelfBook[];
}
