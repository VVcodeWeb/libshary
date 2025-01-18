import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { BookModel } from './models/book.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BookSearchArgs } from './dto/book-search.args';
import { BookFindArgs } from './dto/book-find.args';

@Resolver('Book')
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => BookModel, { nullable: true })
  async findBook(@Args() bookFindArgs?: BookFindArgs): Promise<Book | null> {
    return this.booksService.findOne(bookFindArgs);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [BookModel], { nullable: true })
  searchBooks(@Args() bookSearchArgs: BookSearchArgs): Promise<Book[]> {
    return this.booksService.search(bookSearchArgs);
  }
}
