import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserEvent extends Document {
  @Prop()
  name: string;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  description: string;
}

export const UserEventSchema = SchemaFactory.createForClass(UserEvent);
