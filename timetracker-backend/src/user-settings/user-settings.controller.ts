import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { AccessGuard } from '../auth/guards/AccessGuard.guard';
import { RequestWithUser } from '../auth/interface/requestWithUser.interface';

@Controller('settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @UseGuards(AccessGuard)
  @Patch('')
  update(
    @Body() updateUserSettings: UpdateUserSettingDto,
    @Req() request: RequestWithUser,
  ) {
    return this.userSettingsService.update(updateUserSettings, request.user.id);
  }
}
