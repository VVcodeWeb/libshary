import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Section } from '@prisma/client';

@InputType()
export class CreateSectionInput {
  @Field(() => String)
  name: Section['name'];

  @Field(() => ID)
  shelfId: Section['shelfId'];
}

@InputType()
export class UpdateSectionInput extends PartialType(
  OmitType(CreateSectionInput, ['shelfId']),
) {}
