import { Controller, Get, Param } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('/confirm/:token')
  async confirmEmail(@Param('token') token: string) {
    return await this.emailConfirmationService.confirmEmail(token);
  }
}
