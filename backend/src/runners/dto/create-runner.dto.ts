//DTO -> Data Transfer Object -> validar y transferir los datos entre cliente (API) y backend (NestJS)
import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateRunnerDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsNumber()
  readonly bestTime: number;

  @IsNumber()
  readonly totalDistance: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly eventsParticipated?: string[]; //Agregamos ? para que TS sepa que es opcional
}
