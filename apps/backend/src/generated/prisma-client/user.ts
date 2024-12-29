import { Shelf } from './shelf';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  icon?: string;

  @ApiProperty({ isArray: true, type: () => Shelf })
  shelves: Shelf[];
}
