import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TokenDtoDto {
  @ApiProperty()
  @IsString({
    message: 'Токен должен быть строкой',
  })
  @MinLength(1, {
    message: 'Токен не может быть пустым',
  })
  token: string;
}
