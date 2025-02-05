import { IsString, IsNumber } from 'class-validator';

export class CreateInfoPointDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly latitud: number;

  @IsNumber()
  readonly longitud: number;
}
