import { PartialType } from '@nestjs/mapped-types';
import { CreateResultDto } from './create-result.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateResultDto extends PartialType(CreateResultDto) {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  teacherMessage: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
