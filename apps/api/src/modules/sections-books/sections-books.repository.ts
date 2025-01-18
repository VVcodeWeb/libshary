import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionsBooksRepository {
  constructor(private prisma: PrismaService) {}

  async find({ where }: { where: Prisma.SectionBookWhereInput }) {
    return this.prisma.sectionBook.findMany({
      where,
      include: {
        book: true,
        section: true,
      },
    });
  }

  async create({ data }: { data: Prisma.SectionBookCreateArgs['data'] }) {
    return this.prisma.sectionBook.create({
      data,
    });
  }

  async update({
    where,
    data,
  }: {
    where: Prisma.SectionBookUpdateArgs['where'];
    data: Prisma.SectionBookUpdateArgs['data'];
  }) {
    return this.prisma.sectionBook.update({
      where,
      data,
    });
  }

  async remove({ where }: { where: Prisma.SectionBookDeleteArgs['where'] }) {
    return this.prisma.sectionBook.delete({
      where,
    });
  }
}
