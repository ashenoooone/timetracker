import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSettingsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  hour_rate: number;
}
