import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(['text'])
  contentType: 'text';

  @IsNotEmpty()
  moduleId: number;
}
