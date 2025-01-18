import { Field, ID, InputType } from '@nestjs/graphql';
import { Section } from '@prisma/client';

@InputType()
export class CreateSectionInput {
  @Field(() => String)
  name: Section['name'];

  @Field(() => ID)
  shelfId: Section['shelfId'];
}

@InputType()
export class UpdateSectionInput {
  @Field({ nullable: true })
  name?: string;
}
