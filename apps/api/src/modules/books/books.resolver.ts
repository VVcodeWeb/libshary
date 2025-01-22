import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { BookModel } from './models/book.model';
import { UseGuards } from '@nestjs/common';
import { BookSearchArgs } from './dto/book-search.args';
import { BookFindArgs } from './dto/book-find.args';
import { SearchResponseDto } from './models/search-response.model';
import { GqlAuthGuard } from '../auth/guards/gcl.guard';
import { GraphQLResolveInfo } from 'graphql';
import { generatePrismaInclude } from '@api/shared/utils/graphql-field-parser';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => BookModel, { nullable: true })
  async findBook(
    @Args() bookFindArgs: BookFindArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Book | null> {
    const include = generatePrismaInclude(info);
    return this.booksService.findOne(bookFindArgs, include);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => SearchResponseDto, { nullable: true })
  searchBooks(
    @Args() bookSearchArgs: BookSearchArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<SearchResponseDto> {
    const include = generatePrismaInclude(info);
    return this.booksService.search(bookSearchArgs, include);
  }
}
