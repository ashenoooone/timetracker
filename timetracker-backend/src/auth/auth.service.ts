import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import { genSalt, hash } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailConfirmationService } from '../email-confirmation/email-confirmation.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly mailService: MailerService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  async create(dto: AuthDto) {
    const exUser = await this.repository.findUserByEmail(dto.email);

    if (exUser) {
      throw new BadRequestException('Такой пользователь уже существует!');
    }

    await this.emailConfirmationService.sendConfirmationEmail(dto.email);

    return await this.repository.createUser({
      email: dto.email,
      password: await hash(dto.password, await genSalt(10)),
    });
  }
}
