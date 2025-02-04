import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateUserEventDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsDateString()
  readonly date?: string | Date;

  @IsString()
  readonly description: string;
}
