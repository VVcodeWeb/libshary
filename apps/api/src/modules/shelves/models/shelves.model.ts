import { SectionModel } from '@api/modules/sections/models/section.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Section, Shelf } from '@prisma/client';

@ObjectType()
export class ShelfModel {
  @Field(() => ID)
  id: Shelf['id'];

  @Field(() => String)
  name: Shelf['name'];

  @Field(() => String, { nullable: true })
  description?: Shelf['description'];

  @Field(() => Boolean)
  private: Shelf['private'];

  @Field(() => String)
  ownerId: Shelf['ownerId'];

  @Field(() => Date)
  createdAt: Shelf['createdAt'];

  @Field(() => Date)
  updatedAt: Shelf['updatedAt'];

  @Field(() => [SectionModel])
  sections?: SectionModel[];
}
