import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:3000`);
  // Usa ValidationPipe globalmente para validar todos los DTOs
  app.useGlobalPipes(new ValidationPipe());
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap', err);
});
