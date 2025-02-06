import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Register } from './registerschema';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { RegisterSchema } from './registerschema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
    ]),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
