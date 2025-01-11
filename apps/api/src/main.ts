import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ZodFilter } from './shared/filters/zod.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ZodFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
