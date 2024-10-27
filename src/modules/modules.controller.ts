import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ModuleService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() createModuleDto: CreateModuleDto,
  ): Promise<{ message: string; module: Modules }> {
    const module = await this.moduleService.create(createModuleDto);
    return { message: 'Module created successfully', module };
  }

  @Get()
  async findAll(): Promise<{ message: string; modules: Modules[] }> {
    const modules = await this.moduleService.findAll();
    return { message: 'All modules retrieved successfully', modules };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; module: Modules }> {
    const moduleId = Number(id);
    if (isNaN(moduleId)) {
      throw new NotFoundException(`Invalid ID: ${id}`);
    }
    const module = await this.moduleService.findOne(moduleId);
    return { message: 'Module retrieved successfully', module };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<{ message: string; module: Modules }> {
    const moduleId = Number(id);
    if (isNaN(moduleId)) {
      throw new NotFoundException(`Invalid ID: ${id}`);
    }
    const module = await this.moduleService.update(moduleId, updateModuleDto);
    return { message: 'Module updated successfully', module };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    const moduleId = Number(id);
    if (isNaN(moduleId)) {
      throw new NotFoundException(`Invalid ID: ${id}`);
    }
    await this.moduleService.remove(moduleId);
    return { message: 'Module deleted successfully' };
  }
}
