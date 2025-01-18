import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { SectionsService } from './sections.service';
import { SectionsRepository } from './sections.repository';
import { SectionsResolver } from './sections.resolver';
import { AuthorizationService } from '@api/shared/services/authorization.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [
    SectionsService,
    SectionsResolver,
    SectionsRepository,
    AuthorizationService,
  ],
})
export class SectionsModule {}
