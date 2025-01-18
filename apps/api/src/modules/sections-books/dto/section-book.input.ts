import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSectionBookInput {
  @Field(() => ID)
  googleBookId: string;

  @Field(() => ID)
  sectionId: string;
}

@InputType()
export class UpdateSectionBookInput {
  @Field()
  sectionId: string;
}
