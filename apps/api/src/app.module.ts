import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelvesModule } from './modules/shelves/shelves.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from '@api/modules/books/books.module';
import { ConfigurationModule } from './config/configuration.module';
import { SectionsModule } from './modules/sections/sections.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    ShelvesModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    BooksModule,
    ConfigurationModule,
    SectionsModule,
    MetricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
