import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateShelfInput {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  private: boolean;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => Boolean)
  defaultSections: boolean;
}

@InputType()
export class UpdateShelfInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  private?: boolean;

  @Field({ nullable: true })
  color?: string;
}
