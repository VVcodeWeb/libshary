import { PrismaService } from '@api/modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShelvesRepository {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.ShelfCreateArgs) {
    return await this.prisma.shelf.create(args);
  }

  async findOne(args: Prisma.ShelfFindFirstArgs) {
    return this.prisma.shelf.findFirst(args);
  }

  async findAll(args: Prisma.ShelfFindManyArgs) {
    return this.prisma.shelf.findMany(args);
  }

  async update(args: Prisma.ShelfUpdateArgs) {
    return this.prisma.shelf.update(args);
  }

  async remove(args: Prisma.ShelfDeleteArgs) {
    return this.prisma.shelf.delete(args);
  }
}
