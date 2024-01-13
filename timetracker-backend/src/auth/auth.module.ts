import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthRepository } from './auth.repository';
import { EmailConfirmationModule } from '../email-confirmation/email-confirmation.module';

@Module({
  imports: [DatabaseModule, EmailConfirmationModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
