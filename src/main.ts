import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // Levantar erro quando a chave não existir
      transform: false, // tenta transformar os tipos de dados de para e dtos
    }),
  );
  await app.listen(3000);
}
bootstrap();
