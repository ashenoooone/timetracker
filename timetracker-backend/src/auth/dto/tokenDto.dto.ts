import { IsString, MinLength } from 'class-validator';

export class TokenDtoDto {
  @IsString({
    message: 'Токен должен быть строкой',
  })
  @MinLength(1, {
    message: 'Токен не может быть пустым',
  })
  token: string;
}
