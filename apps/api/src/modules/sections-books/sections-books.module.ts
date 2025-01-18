import { Module } from '@nestjs/common';
import { SectionsBooksService } from './sections-books.service';
import { SectionsBooksResolver } from './sections-books.resolver';
import { SectionsBooksRepository } from './sections-books.repository';
import { PrismaService } from '@api/modules/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationService } from '@api/config/configuration.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthorizationService } from '@api/shared/services/authorization.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [
    SectionsBooksService,
    SectionsBooksResolver,
    SectionsBooksRepository,
    AuthorizationService,
  ],
})
export class SectionsBooksModule {}
