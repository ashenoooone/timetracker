import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTimeEntriesDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  from: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  to: string;

  @ApiProperty()
  @IsNumber()
  userId: number;
}
