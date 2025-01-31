import { IsString, IsDateString } from 'class-validator';

export class CreateUserEventDto {
  @IsString()
  readonly name: string;

  @IsDateString() // Usamos @IsDateString para aceptar fechas en formato string (como '2025-03-01' o '2025-03-01T14:30:00')
  readonly date: string | Date;

  @IsString()
  readonly description: string;
}
