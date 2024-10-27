import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const moduleExists = await this.moduleRepository.findOne({
      where: { id: createLessonDto.moduleId },
    });

    if (!moduleExists) {
      throw new NotFoundException(
        `Module with ID ${createLessonDto.moduleId} not found`,
      );
    }
    const lesson = this.lessonRepository.create(createLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async findOne(id: number): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    await this.findOne(id);
    await this.lessonRepository.update(id, updateLessonDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }

  async findLessonsByModule(moduleId: number): Promise<Lesson[]> {
    const lessons = await this.lessonRepository.find({
      where: { module: { id: moduleId } },
    });

    if (!lessons.length) {
      throw new NotFoundException(`No lessons found for module ID ${moduleId}`);
    }
    return lessons;
  }
}
