import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne({ where, include }: Prisma.SectionFindUniqueArgs) {
    return this.prisma.section.findUnique({
      where,
      include: include ?? {
        shelf: true,
        books: {
          include: {
            book: true,
          },
        },
      },
    });
  }
  async findAll({ where, include }: Prisma.SectionFindManyArgs) {
    return this.prisma.section.findMany({
      where,
      include: include ?? {
        shelf: true,
        books: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async create({ data }: Prisma.SectionCreateArgs) {
    return this.prisma.section.create({ data });
  }

  async update({
    data,
    where,
  }: {
    data: Prisma.SectionUpdateArgs['data'];
    where: Prisma.SectionUpdateArgs['where'];
  }) {
    return this.prisma.section.update({
      where,
      data,
    });
  }

  async remove({ where }: { where: Prisma.SectionDeleteArgs['where'] }) {
    return this.prisma.section.delete({
      where,
    });
  }
}
