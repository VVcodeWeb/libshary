import { Module } from '@nestjs/common';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';
import { PrismaModule } from '@api/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShelvesController],
  providers: [ShelvesService],
})
export class ShelvesModule {}
