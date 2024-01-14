import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateTimeEntryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;
  userId: number;

  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  from: Date;

  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  to: Date;
  projectId: number;
}
