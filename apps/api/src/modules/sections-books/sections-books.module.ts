import { Module } from '@nestjs/common';
import { SectionsBooksService } from './sections-books.service';
import { SectionsBooksResolver } from './sections-books.resolver';
import { SectionsBooksRepository } from './sections-books.repository';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthorizationService } from '@api/shared/services/authorization.service';
import { SharedModule } from '@api/shared/module/shared.module';

@Module({
  imports: [HttpModule, PrismaModule, SharedModule],
  providers: [
    SectionsBooksService,
    SectionsBooksResolver,
    SectionsBooksRepository,
    AuthorizationService,
  ],
})
export class SectionsBooksModule {}
