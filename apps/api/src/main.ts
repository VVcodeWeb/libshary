import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ZodFilter } from './shared/filters/zod.filter';
import { Transport } from '@nestjs/microservices';
import configuration from './config/configuration';

async function bootstrap() {
  const { port, web_host, node_env } = configuration();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: node_env === 'development' ? '*' : web_host,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodFilter());
  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();
