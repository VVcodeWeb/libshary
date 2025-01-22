import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from '@prisma/client';

@ObjectType()
export class BookModel {
  @Field(() => ID)
  id: Book['id'];

  @Field(() => String)
  title: Book['title'];

  @Field(() => [String])
  authors: Book['authors'];

  @Field(() => String, { nullable: true })
  description?: Book['description'];

  @Field(() => Date, { nullable: true })
  publishedAt?: Book['publishedAt'];

  @Field(() => String, { nullable: true })
  publisher?: Book['publisher'];

  @Field(() => Number, { nullable: true })
  pageCount?: Book['pageCount'];

  @Field(() => String, { nullable: true })
  imageLinks?: Book['imageLinks'];

  @Field(() => String, { nullable: true })
  isbn10?: Book['isbn10'];

  @Field(() => String, { nullable: true })
  isbn13?: Book['isbn13'];

  @Field(() => String, { nullable: true })
  googleBookId?: Book['googleBookId'];

  @Field(() => [String])
  categories: Book['categories'];
}
