import { IsNotEmpty, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  gradingType: string;

  @IsInt()
  moduleId: number;

  @IsDateString()
  deadline: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}
