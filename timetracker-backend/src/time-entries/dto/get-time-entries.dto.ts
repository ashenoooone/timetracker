import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetTimeEntriesDto {
  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  from: string;

  @IsOptional()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  to: string;

  @IsNumber()
  userId: number;
}
