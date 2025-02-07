import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, RegisterDocument } from './registerschema';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
  ) {}

  async createUser(createRegisterDto: CreateRegisterDto): Promise<void> {
    const { name, surname, email, password, repeatPassword } =
      createRegisterDto;

    if (password !== repeatPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.registerModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Genera el hash de la contraseña usando bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.registerModel({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
  }
}

//hash->rtdo de aplicar función matemática a un dato(ej:contraseña) -> transformación en cadana única de longitud fija. Irreversible -> no recuperar contraseña original a partir del hash.
//salt->valor aleatorio que se agrega a la contraseña antes de hashearla -> obj:hacer el hash único.
