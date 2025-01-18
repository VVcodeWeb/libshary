import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShelvesRepository {
  constructor(private prisma: PrismaService) {}

  async create({ data }: { data: Prisma.ShelfCreateArgs['data'] }) {
    return await this.prisma.shelf.create({ data });
  }

  async findOne({ where }: { where: Prisma.ShelfFindUniqueArgs['where'] }) {
    return this.prisma.shelf.findUnique({
      where,
    });
  }
  async findAll({ where }: { where: Prisma.ShelfWhereInput }) {
    return this.prisma.shelf.findMany({
      where,
      include: {
        sections: {
          include: {
            books: {
              include: {
                book: true,
              },
            },
          },
        },
      },
    });
  }

  async update({
    data,
    where,
  }: {
    data: Prisma.ShelfUpdateArgs['data'];
    where: Prisma.ShelfUpdateArgs['where'];
  }) {
    return this.prisma.shelf.update({
      where,
      data,
    });
  }

  async remove({ where }: { where: Prisma.ShelfDeleteArgs['where'] }) {
    return this.prisma.shelf.delete({
      where,
    });
  }
}
