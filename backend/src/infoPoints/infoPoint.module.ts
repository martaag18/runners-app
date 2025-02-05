import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InfoPointController } from './infoPoint.controller';
import { InfoPointService } from './infoPoint.service';
import { InfoPoint } from './infoPoint.schema';
import { InfoPointSchema } from './infoPoint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InfoPoint.name, schema: InfoPointSchema },
    ]),
  ],
  controllers: [InfoPointController],
  providers: [InfoPointService],
})
export class InfoPointModule {}
