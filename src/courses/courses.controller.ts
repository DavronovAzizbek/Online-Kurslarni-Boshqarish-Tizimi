import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<{ message: string; data: Course[] }> {
    const courses = await this.coursesService.findAll();
    return {
      message: 'All courses retrieved successfully ✅',
      data: courses,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<{ message: string; data: Course }> {
    const course = await this.coursesService.create(createCourseDto);
    return {
      message: 'Course created successfully ✅',
      data: course,
    };
  }

  @Get('search')
  async searchCourses(
    @Query('category') category: string,
    @Query('keyword') keyword: string,
  ): Promise<{ message: string; data: Course[] }> {
    const courses = await this.coursesService.searchCourses(category, keyword);
    return {
      message: 'Courses filtered and searched successfully ✅',
      data: courses,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: Partial<CreateCourseDto>,
  ): Promise<{ message: string; data: Course }> {
    const updatedCourse = await this.coursesService.update(id, updateCourseDto);
    return {
      message: `Course with ID ${id} updated successfully ✅`,
      data: updatedCourse,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.coursesService.remove(id);
    return {
      message: `Course with ID ${id} deleted successfully ✅`,
    };
  }
}
