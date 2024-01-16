import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MapUserDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: Role[];
}
