import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEventController } from './userEvent.controller';
import { UserEventService } from './userEvent.service';
import { UserEvent } from './userEvent.schema';
import { UserEventSchema } from './userEvent.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEvent.name, schema: UserEventSchema },
    ]),
  ],
  controllers: [UserEventController],
  providers: [UserEventService],
})
export class UserEventModule {}
