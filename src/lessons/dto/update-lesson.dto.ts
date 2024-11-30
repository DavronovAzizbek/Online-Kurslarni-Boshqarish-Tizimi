import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  modulesId: number;
}
