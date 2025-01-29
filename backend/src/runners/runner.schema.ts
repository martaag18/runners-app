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
  bestTime: number; // Mejor tiempo del corredor en 5K, maratón, etc.

  @Prop()
  totalDistance: number; // Distancia total recorrida por el corredor

  @Prop([String])
  eventsParticipated: string[]; // Lista de eventos en los que ha participado
}

export const RunnerSchema = SchemaFactory.createForClass(Runner); //SchemaFactory-->función para crear un esquema Moongose a partir de una clase (en este caso, class Runner)
