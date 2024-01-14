import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDtoDto } from './dto/tokenDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: AuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('/token/refresh')
  refreshTokens(@Body() accessTokenDto: TokenDtoDto) {
    return this.authService.refreshTokens(accessTokenDto);
  }
}
