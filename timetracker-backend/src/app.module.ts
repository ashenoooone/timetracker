import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    MailerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        MAIL_DOMAIN: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        MAIL_ADDRESS: Joi.string().required(),
      }),
    }),
    EmailConfirmationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
