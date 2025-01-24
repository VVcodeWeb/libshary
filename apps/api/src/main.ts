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
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodFilter());
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
