import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionsBooksRepository {
  constructor(private prisma: PrismaService) {}

  async find(args: Prisma.SectionBookFindManyArgs) {
    return this.prisma.sectionBook.findMany(args);
  }

  async create(args: Prisma.SectionBookCreateArgs) {
    return this.prisma.sectionBook.create(args);
  }

  async update(args: Prisma.SectionBookUpdateArgs) {
    return this.prisma.sectionBook.update(args);
  }

  async remove(args: Prisma.SectionBookDeleteArgs) {
    return this.prisma.sectionBook.delete(args);
  }
}
