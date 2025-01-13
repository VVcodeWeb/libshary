import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationModule } from '@api/config/configuration.module';
import { PrismaModule } from '@api/modules/prisma/prisma.module';

@Module({
  imports: [HttpModule, ConfigurationModule, PrismaModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
