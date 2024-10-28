import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>,
  ) {}

  async create({
    title,
    content,
    contentType,
    modulesId,
  }: CreateLessonDto): Promise<Lesson> {
    const modules = await this.moduleRepository.findOneBy({ id: modulesId });
    if (!modules)
      throw new HttpException('Modules not found', HttpStatus.NOT_FOUND);
    const lesson = await this.lessonRepository.create({
      title,
      content,
      contentType,
      modules,
    });
    await this.lessonRepository.save(lesson);
    return lesson;
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
    const lesson = await this.findOne(id);

    if (updateLessonDto.modulesId) {
      const moduleExists = await this.moduleRepository.findOne({
        where: { id: updateLessonDto.modulesId },
      });

      if (!moduleExists) {
        throw new NotFoundException(
          `Module with ID ${updateLessonDto.modulesId} not found`,
        );
      }

      lesson.modules = moduleExists;
    }

    Object.assign(lesson, updateLessonDto);
    return this.lessonRepository.save(lesson);
  }

  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    await this.lessonRepository.remove(lesson);
  }
}
