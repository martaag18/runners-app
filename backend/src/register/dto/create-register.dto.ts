import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  repeatPassword: string;
}
