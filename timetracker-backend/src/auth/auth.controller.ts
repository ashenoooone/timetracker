import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
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
    return this.authService.check(request.user.id);
  }
}
