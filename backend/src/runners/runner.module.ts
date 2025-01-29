// runner.module.ts -> módulo de NestJS que agrupa todos los elementos relacionados con los "runners"
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';
import { Runner, RunnerSchema } from './runner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Runner.name, schema: RunnerSchema }]),
  ],
  controllers: [RunnerController],
  providers: [RunnerService],
})
export class RunnerModule {}
