import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthDto {
  @IsEmail(
    {},
    {
      message: 'Введите корректный email',
    },
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minNumbers: 1,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
    },
    {
      message:
        'Пароль должен содержать не менее 6 символов, 1 числа, 1 специального символа, 1 большой буквы, 1 маленькой.',
    },
  )
  password: string;
}
