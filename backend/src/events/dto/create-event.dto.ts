import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  readonly name: string;

  @IsDateString()
  readonly date: string | Date;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly latitud: number;

  @IsNumber()
  readonly longitud: number;
}
