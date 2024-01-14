import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateUserSettingDto } from './dto/update-user-setting.dto';
import { CreateUserSettingsDto } from './dto/create-user-settings.dto';

@Injectable()
export class UserSettingsService {
  constructor(private readonly dbClient: DatabaseService) {}

  async createUserSettings(dto: CreateUserSettingsDto) {
    const user = await this.dbClient.users.findFirst({
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new BadRequestException('Пользователь не найден.');
    }

    return this.dbClient.usersSettings.create({
      data: {
        hour_rate: dto.hour_rate,
        usersId: user.id,
      },
    });
  }

  async update(updateUserSettings: UpdateUserSettingDto, userId: number) {
    const settings = await this.dbClient.usersSettings.findFirst({
      where: {
        usersId: userId,
      },
    });

    if (!settings) {
      throw new BadRequestException('Настройки пользователя не найдены');
    }

    return this.dbClient.usersSettings.update({
      where: {
        id: settings.id,
      },
      data: {
        hour_rate: updateUserSettings.hour_rate,
      },
    });
  }
}
