import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelvesModule } from './modules/shelves/shelves.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BooksModule } from '@api/modules/books/books.module';
import { ConfigurationModule } from './config/configuration.module';
import { SectionsModule } from './modules/sections/sections.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { SectionsBooksModule } from './modules/sections-books/sections-books.module';

@Module({
  imports: [
    ShelvesModule,
    PrismaModule,
    AuthModule,
    BooksModule,
    ConfigurationModule,
    SectionsModule,
    MetricsModule,
    SectionsBooksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'libs/graphql/src/schema.gql'),
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
