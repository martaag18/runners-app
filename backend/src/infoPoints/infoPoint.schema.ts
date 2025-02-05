import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; //Prop->decorador de NestJS para definir propiedades del modelo
import { Document } from 'mongoose';

@Schema()
export class InfoPoint extends Document {
  @Prop()
  name: string;

  @Prop()
  latitud: number;

  @Prop()
  longitud: number;
}

export const InfoPointSchema = SchemaFactory.createForClass(InfoPoint);
