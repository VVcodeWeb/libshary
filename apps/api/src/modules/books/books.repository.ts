import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.BookCreateArgs) {
    return this.prisma.book.create(args);
  }

  async findOne(args: Prisma.BookFindFirstArgs) {
    return this.prisma.book.findFirst(args);
  }

  async update(args: Prisma.BookUpdateArgs) {
    return this.prisma.book.update(args);
  }

  async remove(args: Prisma.BookDeleteArgs) {
    return this.prisma.book.delete(args);
  }

  async findAll(args: Prisma.BookFindManyArgs) {
    return this.prisma.book.findMany(args);
  }
}
