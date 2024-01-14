import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
