import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthRepository {
  constructor(public readonly dbClient: DatabaseService) {}

  async findUserByEmail(email: string) {
    return this.dbClient.users.findFirst({
      where: {
        email,
      },
    });
  }

  async createUser(data: AuthDto) {
    return this.dbClient.users.create({
      data,
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }
}
