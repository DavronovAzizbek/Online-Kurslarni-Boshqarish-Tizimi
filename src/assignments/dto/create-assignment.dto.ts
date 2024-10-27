import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  gradingType: string;

  @IsInt()
  moduleId: number;
}
