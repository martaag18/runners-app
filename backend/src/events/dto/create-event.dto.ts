import { IsString, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly date: Date;

  @IsNumber()
  readonly description: string;

  @IsNumber()
  readonly latitud: number;

  @IsNumber()
  readonly longitud: number;
}
