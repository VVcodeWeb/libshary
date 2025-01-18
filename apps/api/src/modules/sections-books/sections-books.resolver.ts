import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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

@Resolver(() => SectionBookModel)
export class SectionsBooksResolver {
  constructor(private readonly sectionsBooksService: SectionsBooksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [SectionBookModel], { nullable: true })
  findSectionBooks(
    @Args('sectionId') sectionId: string,
    @User() user: AuthUser,
  ) {
    return this.sectionsBooksService.find(sectionId, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [SectionBookModel], { nullable: true })
  findAllSectionBooks(@User() user: AuthUser) {
    return this.sectionsBooksService.findAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SectionBookModel)
  createSectionBook(
    @Args('createSectionBookInput')
    createSectionBookInput: CreateSectionBookInput,
    @User() user: AuthUser,
  ) {
    return this.sectionsBooksService.create(createSectionBookInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SectionBookModel)
  updateSectionBook(
    @Args('updateSectionBookInput')
    updateSectionBookInput: UpdateSectionBookInput,
    @Args('id') id: string,
    @User() user: AuthUser,
  ) {
    return this.sectionsBooksService.update(id, updateSectionBookInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => SectionBookModel)
  removeSectionBook(
    @Args('sectionId') sectionId: string,
    @Args('bookId') bookId: string,
    @User() user: AuthUser,
  ) {
    return this.sectionsBooksService.remove(sectionId, bookId, user);
  }
}
