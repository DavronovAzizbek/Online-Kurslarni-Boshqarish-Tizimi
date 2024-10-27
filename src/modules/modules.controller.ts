import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ModuleService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Modules } from './entities/module.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createModuleDto: CreateModuleDto): Promise<Modules> {
    return this.moduleService.create(createModuleDto);
  }

  @Get('all')
  async findAll(): Promise<Modules[]> {
    return this.moduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Modules> {
    return this.moduleService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<Modules> {
    return this.moduleService.update(id, updateModuleDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.moduleService.remove(id);
  }
}
