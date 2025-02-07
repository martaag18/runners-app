import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(
    @Body() createRegisterDto: CreateRegisterDto,
  ): Promise<{ message: string }> {
    try {
      await this.registerService.createUser(createRegisterDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
    }
  }
}
