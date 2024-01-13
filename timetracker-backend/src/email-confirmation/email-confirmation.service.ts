import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { DatabaseService } from '../database/database.service';
import { randomBytes } from 'crypto';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly mailService: MailerService,
    private readonly dbClient: DatabaseService,
  ) {}

  async confirmEmail(token: string) {
    const emailToConfirm = await this.dbClient.emailVerifications.findFirst({
      where: {
        code: token,
      },
    });
    if (!emailToConfirm) {
      throw new BadRequestException('Email not found');
    }
    const user = await this.dbClient.users.findFirst({
      where: {
        email: emailToConfirm.email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.dbClient.emailVerifications.delete({
      where: {
        id: emailToConfirm.id,
      },
    });

    await this.dbClient.users.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
      },
    });

    return true;
  }

  async sendConfirmationEmail(email: string) {
    const token = randomBytes(32).toString('hex');

    try {
      await this.mailService.sendMail({
        to: email,
        from: 'Time Tracker',
        subject: 'Подтверждение регистрации',
        template: './confirmation',
        context: {
          name: email,
          url: `http://localhost:3000/email/confirm/${token}`,
        },
      });
      await this.dbClient.emailVerifications.create({
        data: {
          email: email,
          code: token,
        },
      });
    } catch (e) {
      throw e;
    }
  }
}
