import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, RegisterDocument } from '../register/registerschema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Register.name) private userModel: Model<RegisterDocument>, //Permite que usuario pueda interactuar con base de datos
    private jwtService: JwtService, // Inyectamos JwtService
  ) {}

  // Busca al usuario por email, compara la contraseña y genera el token
  async loginUser(
    email: string,
    inputPassword: string,
  ): Promise<{ token: string }> {
    console.log('Buscando usuario con email:', email);
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      console.error('Usuario no encontrado para el email:', email);
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.password) {
      console.error('El usuario encontrado no tiene contraseña definida.');
      throw new UnauthorizedException('Invalid email or password');
    }
    // Verificamos la contraseña usando bcrypt.compare
    const isValid = await bcrypt.compare(inputPassword, user.password);
    if (!isValid) {
      console.error('La comparación de contraseñas falló.');
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log('Login exitoso para el usuario:', email);

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

// El JWT (JSON Web Token) se compone de tres partes: el header, el payload y la firma.
// El payload es la parte donde se almacena la información que se puede usar para identificar y autorizar al usuario en futuras peticiones.
