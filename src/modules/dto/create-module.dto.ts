import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}
