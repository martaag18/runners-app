// runner.schema.ts --> definir cómo se almacenarán los datos de los corredores en MongoDB
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'; //Prop->decorador de NestJS para definir propiedades del modelo
import { Document } from 'mongoose';

@Schema()
export class Runner extends Document {
  //Documnet->parte de Moongose->Objeto será tratado como documento dentro de MongoDB
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  bestTime: number;

  @Prop()
  totalDistance: number;

  @Prop([String])
  eventsParticipated: string[];
}

export const RunnerSchema = SchemaFactory.createForClass(Runner); //SchemaFactory-->función para crear un esquema Moongose a partir de una clase (en este caso, class Runner)
