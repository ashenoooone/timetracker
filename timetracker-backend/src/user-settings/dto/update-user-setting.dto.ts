import { IsNumber, Min } from 'class-validator';

export class UpdateUserSettingDto {
  @IsNumber()
  @Min(1, {
    message: 'Минимальная ставка - 1',
  })
  hour_rate: number;
}
