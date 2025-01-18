import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Section, SectionBook } from '@prisma/client';
import { SectionBookModel } from '../../sections-books/models/section-book.model';
import { ShelfModel } from '@api/modules/shelves/models/shelves.model';

@ObjectType()
export class SectionModel {
  @Field(() => ID)
  id: Section['id'];

  @Field(() => String)
  name: Section['name'];

  @Field(() => ID)
  shelfId: Section['shelfId'];

  @Field(() => ShelfModel)
  shelf: ShelfModel;

  @Field(() => Date)
  createdAt: Section['createdAt'];

  @Field(() => Date)
  updatedAt: Section['updatedAt'];

  @Field(() => [SectionBookModel], { nullable: 'itemsAndList' })
  books?: SectionBook[];
}
