import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Event extends Document {
  @Prop()
  name: string;

  @Prop({ type: [Date, String] })
  date: Date | string;

  @Prop()
  description: string;

  @Prop()
  latitud: number;

  @Prop()
  longitud: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
