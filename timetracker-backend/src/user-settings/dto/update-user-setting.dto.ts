import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserSettingDto {
  @ApiProperty()
  @IsNumber()
  @Min(1, {
    message: 'Минимальная ставка - 1',
  })
  hour_rate: number;
}
