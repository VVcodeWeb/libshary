import { SearchApi } from '@libshary/shared-types';
import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional, IsString, IsArray } from 'class-validator';
registerEnumType(SearchApi, {
  name: 'SearchApi',
});
@ArgsType()
export class BookSearchArgs {
  @Field({ nullable: true })
  @IsString()
  q: string;

  @Field(() => SearchApi, { nullable: true })
  @IsOptional()
  @IsEnum(SearchApi)
  api?: SearchApi;

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
