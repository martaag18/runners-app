import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunnerModule } from './runners/runner.module';
import { EventModule } from './events/event.module';
import { UserEventModule } from './usersEvents/userEvent.module';
import { InfoPointModule } from './infoPoints/infoPoint.module';
import { RegisterModule } from './register/register.module';

@Module({
  imports: [
    // Configuración de Mongoose para conectar con MongoDB Atlas
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
    // Configuración de ConfigModule para cargar las variables de entorno desde el archivo .env
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RunnerModule,
    EventModule,
    UserEventModule,
    InfoPointModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
