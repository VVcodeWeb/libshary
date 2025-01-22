import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { SectionsBooksService } from './sections-books.service';
import { AuthUser } from '@api/shared/models/user.model';
import { User } from '@api/shared/decorators/user.decorator';
import { SectionBookModel } from './models/section-book.model';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gcl.guard';
import {
  CreateSectionBookInput,
  UpdateSectionBookInput,
} from './dto/section-book.input';
import { GraphQLResolveInfo } from 'graphql';
import { generatePrismaInclude } from '@api/shared/utils/graphql-field-parser';

@Resolver(() => SectionBookModel)
@UseGuards(GqlAuthGuard)
export class SectionsBooksResolver {
  constructor(private readonly sectionsBooksService: SectionsBooksService) {}

  @Query(() => [SectionBookModel], { nullable: true })
  findSectionBooks(
    @Args('sectionId') sectionId: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    return this.sectionsBooksService.find(sectionId, user, include);
  }

  @Query(() => [SectionBookModel], { nullable: true })
  findAllSectionBooks(
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    return this.sectionsBooksService.findAll(user, include);
  }

  @Mutation(() => SectionBookModel)
  createSectionBook(
    @Args('createSectionBookInput')
    createSectionBookInput: CreateSectionBookInput,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    return this.sectionsBooksService.create(
      createSectionBookInput,
      user,
      include,
    );
  }

  @Mutation(() => SectionBookModel)
  updateSectionBook(
    @Args('updateSectionBookInput')
    updateSectionBookInput: UpdateSectionBookInput,
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    return this.sectionsBooksService.update(
      id,
      updateSectionBookInput,
      user,
      include,
    );
  }

  @Mutation(() => SectionBookModel)
  removeSectionBook(
    @Args('sectionId') sectionId: string,
    @Args('bookId') bookId: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    return this.sectionsBooksService.remove(sectionId, bookId, user, include);
  }
}
