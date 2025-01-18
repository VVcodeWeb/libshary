import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class BookFindArgs {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => ID, { nullable: true })
  googleBookId?: string;
}
