import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('email')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Get('/confirm/:token')
  @Redirect('http://localhost:3000/login')
  async redirectToLogin(@Param('token') token: string) {
    return await this.emailConfirmationService.confirmEmail(token);
  }
}
