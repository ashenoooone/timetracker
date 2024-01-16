import { MapUserDto } from './mapUser.dto';
import { TokensDto } from './tokens.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginReturnDto extends TokensDto {
  @ApiProperty()
  user: MapUserDto;
}
