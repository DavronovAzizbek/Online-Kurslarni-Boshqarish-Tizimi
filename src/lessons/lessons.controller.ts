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
import { LessonService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<{ message: string; lesson: Lesson }> {
    const lesson = await this.lessonService.create(createLessonDto);
    return { message: 'Lesson created successfully ✅', lesson };
  }

  @Get()
  async findAll(): Promise<{ message: string; lessons: Lesson[] }> {
    const lessons = await this.lessonService.findAll();
    return { message: 'Lessons retrieved successfully ✅', lessons };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; lesson: Lesson }> {
    const lesson = await this.lessonService.findOne(+id);
    return { message: 'Lesson retrieved successfully ✅', lesson };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<{ message: string; lesson: Lesson }> {
    const lesson = await this.lessonService.update(+id, updateLessonDto);
    return { message: 'Lesson updated successfully ✅', lesson };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.lessonService.remove(+id);
    return { message: 'Lesson deleted successfully ✅' };
  }
}
