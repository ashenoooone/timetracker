import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDtoDto } from './dto/tokenDto.dto';
import { DatabaseService } from '../database/database.service';
import { Users } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { MapUserDto } from './dto/mapUser.dto';
import { TokensDto } from './dto/tokens.dto';
import { LoginReturnDto } from './dto/loginReturn.dto';

@Injectable()
export class AuthService {
  constructor(
    public readonly dbClient: DatabaseService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly jwtService: JwtService,
    private readonly userSettingsService: UserSettingsService,
    private readonly configService: ConfigService,
  ) {}

  async check(userId: number): Promise<MapUserDto> {
    const user = await this.dbClient.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user.verified) {
      throw new BadRequestException('Пользователь не подтвержден');
    }

    return this.mapUser(user);
  }

  async login(dto: AuthDto): Promise<LoginReturnDto> {
    const user = await this.dbClient.users.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Пользователь не найден.');
    }

    if (!user.verified) {
      throw new BadRequestException('Подтвердите аккаунт по email');
    }

    const isMatch = await compare(dto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Неверно введен пароль.');
    }

    const tokens = await this.generateTokensPair({
      id: user.id,
      email: user.email,
    });

    await this.dbClient.users.update({
      data: {
        refreshToken: tokens.refreshToken,
      },
      where: {
        id: user.id,
      },
    });

    return {
      user: this.mapUser(user),
      ...tokens,
    };
  }

  mapUser(user: Users): MapUserDto {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async refreshTokens(refreshToken: TokenDtoDto): Promise<LoginReturnDto> {
    const { token } = refreshToken;

    const result = await this.jwtService.verifyAsync(token);

    if (!result) throw new BadRequestException('Неверный токен.');

    const user = await this.dbClient.users.findFirst({
      where: {
        email: result.email,
      },
    });

    const tokens = await this.generateTokensPair({
      email: user.email,
      id: user.id,
    });

    await this.dbClient.users.update({
      data: {
        refreshToken: tokens.refreshToken,
      },
      where: {
        id: user.id,
      },
    });

    return {
      user: this.mapUser(user),
      ...tokens,
    };
  }

  async create(dto: AuthDto) {
    const exUser = await this.dbClient.users.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (exUser) {
      throw new BadRequestException('Такой пользователь уже существует!');
    }

    await this.emailConfirmationService.sendConfirmationEmail(dto.email);

    const createdUser = await this.dbClient.users.create({
      data: {
        email: dto.email,
        password: await hash(dto.password, await genSalt(10)),
      },
    });

    await this.userSettingsService.createUserSettings({
      hour_rate: 1,
      userId: createdUser.id,
    });

    return this.mapUser(createdUser);
  }

  async generateTokensPair(data: {
    id: number;
    email: string;
  }): Promise<TokensDto> {
    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });

    return {
      refreshToken,
      accessToken,
    };
  }
}
