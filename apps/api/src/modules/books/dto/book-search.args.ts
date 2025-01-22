import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsArray } from 'class-validator';

@ArgsType()
export class BookSearchArgs {
  @Field({ nullable: true })
  @IsString()
  q: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  offset?: number;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
