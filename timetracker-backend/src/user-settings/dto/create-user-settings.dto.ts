import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateUserSettingsDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  hour_rate: number;
}
