import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksRepository {
  constructor(private prisma: PrismaService) {}

  async create({ data }: { data: Prisma.BookCreateArgs['data'] }) {
    return await this.prisma.book.create({ data });
  }

  async findOne({ where }: { where: Prisma.BookFindFirstArgs['where'] }) {
    return this.prisma.book.findFirst({
      where,
    });
  }

  async update({
    data,
    where,
  }: {
    data: Prisma.BookUpdateArgs['data'];
    where: Prisma.BookUpdateArgs['where'];
  }) {
    return this.prisma.book.update({
      where,
      data,
    });
  }

  async remove({ where }: { where: Prisma.BookDeleteArgs['where'] }) {
    return this.prisma.book.delete({
      where,
    });
  }

  async findAll({ where }: { where: Prisma.BookWhereInput }) {
    return this.prisma.book.findMany({
      where,
    });
  }
}
