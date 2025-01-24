import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateShelfInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Boolean)
  @IsBoolean()
  private: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Field(() => Boolean)
  @IsBoolean()
  defaultSections: boolean;
}

@InputType()
export class UpdateShelfInput extends PartialType(
  OmitType(CreateShelfInput, ['defaultSections']),
) {}
