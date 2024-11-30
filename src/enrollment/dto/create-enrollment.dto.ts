import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;
}
