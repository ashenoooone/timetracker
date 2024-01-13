import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    MailerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmailConfirmationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
