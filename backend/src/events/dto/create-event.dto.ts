import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateEventDto {
  @IsString()
  readonly name: string;

  @IsDate()
  readonly date: Date;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly latitud: number;

  @IsNumber()
  readonly longitud: number;
}
