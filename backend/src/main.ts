import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.FRONTEND_ORIGIN });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(+process.env.BE_PORT || 8000);
}
void bootstrap();
