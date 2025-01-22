import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { SectionsService } from './sections.service';
import { AuthUser } from '@api/shared/models/user.model';
import { Section } from '@prisma/client';
import { CreateSectionInput, UpdateSectionInput } from './dto/sections.input';
import { SectionModel } from './models/section.model';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gcl.guard';
import { GraphQLResolveInfo } from 'graphql';
import { generatePrismaInclude } from '@api/shared/utils/graphql-field-parser';
import { User } from '@api/shared/decorators/user.decorator';

@Resolver(() => SectionModel)
@UseGuards(GqlAuthGuard)
export class SectionsResolver {
  private logger = new Logger(SectionsResolver.name);
  constructor(private readonly sectionsService: SectionsService) {}

  @Mutation(() => SectionModel)
  createSection(
    @Args('createSectionInput') createSectionInput: CreateSectionInput,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section> {
    const include = generatePrismaInclude(info);
    return this.sectionsService.create(createSectionInput, user, include);
  }

  @Query(() => SectionModel, { nullable: true })
  async findSection(
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section | null> {
    const include = generatePrismaInclude(info);
    return this.sectionsService.findOne(id, user, include);
  }

  @Query(() => [SectionModel], { nullable: true })
  async findAllSections(
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section[]> {
    const include = generatePrismaInclude(info);
    return this.sectionsService.findAll(user, include);
  }

  @Mutation(() => SectionModel)
  updateSection(
    @Args('id') id: string,
    @Args('updateSectionInput') updateSectionInput: UpdateSectionInput,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section> {
    const include = generatePrismaInclude(info);
    return this.sectionsService.update(id, updateSectionInput, user, include);
  }

  @Mutation(() => SectionModel)
  removeSection(
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section> {
    const include = generatePrismaInclude(info);
    return this.sectionsService.remove(id, user, include);
  }
}
