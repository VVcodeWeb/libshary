import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ZodFilter } from './shared/filters/zod.filter';
import { Transport } from '@nestjs/microservices';
import { PinoLoggerService } from './shared/services/pino-logger.service';
import { transport } from 'pino';
import configuration from './config/configuration';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configuration().rabbitmq_url],
    },
  });

  // app.connectMicroservice({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'booksearch',
  //     protoPath: join(
  //       process.cwd(),
  //       'dist/libs/grpc/src/protos/booksearch.proto',
  //     ),
  //     url: configuration().booksearch_grpc,
  //   },
  // });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodFilter());
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
