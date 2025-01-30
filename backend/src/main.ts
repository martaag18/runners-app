import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes de dominios específicos
  app.enableCors({
    origin: '*', // Permite solicitudes desde cualquier origen (en desarrollo)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, Authorization', // Encabezados permitidos
    credentials: true, // Permite el envío de credenciales (cookies, tokens)
  });

  // Usa ValidationPipe globalmente para validar todos los DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:3000`);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap', err);
});
