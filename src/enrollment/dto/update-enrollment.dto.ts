import { IsOptional, IsNumber } from 'class-validator';

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsNumber()
  courseId?: number;
}
