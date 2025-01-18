import { Module } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { PrismaModule } from '@api/modules/prisma/prisma.module';
import { ShelvesRepository } from './shelves.repository';
import { ShelvesResolver } from './shelves.resolver';
import { AuthorizationService } from '@api/shared/services/authorization.service';

@Module({
  imports: [PrismaModule],
  providers: [
    ShelvesService,
    ShelvesResolver,
    ShelvesRepository,
    AuthorizationService,
  ],
})
export class ShelvesModule {}
