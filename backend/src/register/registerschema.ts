import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type RegisterDocument = Register & Document;

@Schema()
export class Register {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;
}

// Genera el esquema de Mongoose
export const RegisterSchema = SchemaFactory.createForClass(Register);

// Middleware para cifrar contraseñas antes de guardar --> Middleware pre(save) -> ejecuta antes de guardar un documento en la base de datos -> util si se crean usuarios directamente desde Mongoose, sin pasar por el servicio. -> Garatinza todas las contraseñas cifradas sin importar cómo lleguen allí.
RegisterSchema.pre<RegisterDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});
