import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RunnerModule } from './runners/runner.module';
import { EventModule } from './events/event.module';
import { UserEventModule } from './usersEvents/userEvent.module';
import { InfoPointModule } from './infoPoints/infoPoint.module';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './login/auth.module';

@Module({
  imports: [
    // Cargar ConfigModule primero para que las variables de entorno estén disponibles
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          throw new Error('Mongo URI is not defined');
        }
        return { uri };
      },
    }),
    RunnerModule,
    EventModule,
    UserEventModule,
    InfoPointModule,
    RegisterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
