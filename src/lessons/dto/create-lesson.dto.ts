import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;

  @IsNotEmpty()
  @IsNumber()
  modulesId: number;
}
