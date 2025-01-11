import { Module } from '@nestjs/common';
import { BookSearchService } from './book-search.service';
import { ConfigurationModule } from '@api/config/configuration.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, ConfigurationModule, PrismaModule],
  providers: [BookSearchService],
  exports: [BookSearchService, PrismaModule],
})
export class BookSearchModule {}
