import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationModule } from '@api/config/configuration.module';
import { PrismaModule } from '@api/modules/prisma/prisma.module';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { BooksRepository } from './books.repository';

@Module({
  imports: [HttpModule, ConfigurationModule, PrismaModule],
  providers: [BooksService, BooksResolver, BooksRepository],
})
export class BooksModule {}
