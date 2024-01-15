import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeEntryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;
  userId: number;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  from: Date;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  to: Date;
  projectId: number;
}
