import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para login que retorna el token generado
  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
  ): Promise<{ token: string }> {
    console.log('Login DTO recibido:', loginDto);
    try {
      const result = await this.authService.loginUser(
        loginDto.email,
        loginDto.password,
      );
      return result; // Devuelve { token: '...' }
    } catch (error) {
      console.error('Error en el login en el controller:', error);
      throw new HttpException(
        (error as Error).message,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
