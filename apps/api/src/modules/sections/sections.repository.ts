import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SectionsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(args: Prisma.SectionFindUniqueArgs) {
    return this.prisma.section.findUnique(args);
  }

  async findAll(args: Prisma.SectionFindManyArgs) {
    return this.prisma.section.findMany(args);
  }

  async create(args: Prisma.SectionCreateArgs) {
    return this.prisma.section.create(args);
  }

  async update(args: Prisma.SectionUpdateArgs) {
    return this.prisma.section.update(args);
  }

  async remove(args: Prisma.SectionDeleteArgs) {
    return this.prisma.section.delete(args);
  }
}
