// src/lessons/dto/update-lesson.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  title?: string; // Yangilangan dars nomi

  @IsOptional()
  @IsString()
  content?: string; // Yangilangan dars matni yoki video linki
}
