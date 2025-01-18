import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { SectionsService } from './sections.service';
import { AuthUser } from '@api/shared/models/user.model';
import { Section } from '@prisma/client';
import { CreateSectionInput, UpdateSectionInput } from './dto/sections.input';
import { SectionModel } from './models/section.model';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gcl.guard';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
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
  ): Promise<Section> {
    return this.sectionsService.create(createSectionInput, user);
  }

  @Query(() => SectionModel, { nullable: true })
  async findSection(
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section | null> {
    return this.sectionsService.findOne(id, user);
  }

  @Query(() => [SectionModel], { nullable: true })
  async findAllSections(
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Section[]> {
    const parsedInfo = parseResolveInfo(info, {
      deep: true,
    });
    this.logger.log({ parsedInfo });
    return this.sectionsService.findAll(user);
  }

  @Mutation(() => SectionModel)
  updateSection(
    @Args('id') id: string,
    @Args('updateSectionInput') updateSectionInput: UpdateSectionInput,
    @User() user: AuthUser,
  ): Promise<Section> {
    return this.sectionsService.update(id, updateSectionInput, user);
  }

  @Mutation(() => SectionModel)
  removeSection(
    @Args('id') id: string,
    @User() user: AuthUser,
  ): Promise<Section> {
    return this.sectionsService.remove(id, user);
  }
}
