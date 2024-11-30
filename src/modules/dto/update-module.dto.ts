// src/modules/dto/update-module.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}
