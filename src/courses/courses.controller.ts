import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @Get('filter')
  async findByCategory(@Query('category') category: string): Promise<Course[]> {
    if (!category) {
      throw new BadRequestException('Search query cannot be empty');
    }
    return this.coursesService.findAll(category);
  }

  @Get('search')
  async searchByName(@Query('search') search: string): Promise<Course[]> {
    if (!search) {
      throw new BadRequestException('Search query cannot be empty');
    }
    return this.coursesService.findAll(undefined, search);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Course> {
    return this.coursesService.findOneById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: Partial<CreateCourseDto>,
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    return this.coursesService.remove(id);
  }
}
