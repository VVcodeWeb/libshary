import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'info' | 'warn' | 'query' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [{ emit: 'event', level: 'query' }],
    });
  }
  private logger = new Logger(PrismaService.name);
  async onModuleInit() {
    // this.$on('query', (e) => {
    //   // this.logger.log(`Query: ${e.query}`);
    //   // this.logger.log(`Params: ${e.params}`);
    //   // this.logger.log(`Duration: ${e.duration}ms`);
    //   // this.logger.log(`Model: ${e.target}`);
    // });
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
