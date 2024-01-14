import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UserSettingsController],
  providers: [UserSettingsService],
  imports: [DatabaseModule],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
