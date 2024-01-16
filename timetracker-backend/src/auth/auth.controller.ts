import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDtoDto } from './dto/tokenDto.dto';
import { RequestWithUser } from './interface/requestWithUser.interface';
import { AccessGuard } from './guards/AccessGuard.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { LoginReturnDto } from './dto/loginReturn.dto';
import { MapUserDto } from './dto/mapUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOkResponse({
    type: MapUserDto,
  })
  register(@Body() createAuthDto: AuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  @ApiOkResponse({
    type: LoginReturnDto,
  })
  login(@Body() loginDto: AuthDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AccessGuard)
  @Get('/check')
  @ApiOkResponse({
    type: MapUserDto,
  })
  check(@Req() request: RequestWithUser) {
    console.log(request.user);
    return this.authService.check(request.user.id);
  }

  @ApiOkResponse({
    type: LoginReturnDto,
  })
  @Post('/token/refresh')
  refreshTokens(@Body() accessTokenDto: TokenDtoDto) {
    return this.authService.refreshTokens(accessTokenDto);
  }
}
