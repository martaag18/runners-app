import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunnerModule } from './runners/runner.module';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    // Configuración de ConfigModule para cargar las variables de entorno desde el archivo .env
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Configuración de MongooseModule para conectarse a MongoDB usando la URI del archivo .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], // Inyectamos ConfigService para acceder a las variables de entorno
      useFactory: (configService: ConfigService) => {
        // Obtenemos la URI de la base de datos desde el archivo .env
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('Mongo URI is not defined');
        }
        return {
          uri,
        };
      },
    }),
    RunnerModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
