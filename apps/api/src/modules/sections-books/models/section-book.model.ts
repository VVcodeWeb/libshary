import { BookModel } from '@api/modules/books/models/book.model';
import { SectionModel } from '@api/modules/sections/models/section.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SectionBook } from '@prisma/client';

@ObjectType()
export class SectionBookModel {
  @Field(() => ID)
  id: SectionBook['id'];

  @Field(() => ID)
  sectionId: SectionBook['sectionId'];

  @Field(() => ID)
  bookId: SectionBook['bookId'];

  @Field(() => Date)
  createdAt: SectionBook['createdAt'];

  @Field(() => Date)
  updatedAt: SectionBook['updatedAt'];

  @Field(() => BookModel)
  book: BookModel;

  @Field(() => SectionModel)
  section: SectionModel;
}
