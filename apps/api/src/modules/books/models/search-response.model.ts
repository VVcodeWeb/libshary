import { Field, ObjectType } from '@nestjs/graphql';
import { BookModel } from './book.model';

@ObjectType()
export class SearchResponseDto {
  @Field()
  apiProvider: string;

  @Field()
  totalNumber: number;

  @Field()
  limit: number;

  @Field()
  offset: number;

  @Field(() => [BookModel])
  books: BookModel[];
}
