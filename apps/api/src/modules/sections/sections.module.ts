import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { BookSearchModule } from '@api/modules/book-search/book-search.module';

@Module({
  controllers: [SectionsController],
  providers: [SectionsService],
  imports: [BookSearchModule],
})
export class SectionsModule {}
