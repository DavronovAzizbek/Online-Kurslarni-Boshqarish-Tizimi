import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Modules)
    private readonly moduleRepository: Repository<Modules>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Modules> {
    const course = await this.courseRepository.findOne({
      where: { id: createModuleDto.courseId },
    });

    if (!course) {
      throw new NotFoundException(
        `Course with ID ${createModuleDto.courseId} not found`,
      );
    }

    const module = this.moduleRepository.create({
      ...createModuleDto,
      course,
    });

    return this.moduleRepository.save(module);
  }

  async findAll(): Promise<Modules[]> {
    return this.moduleRepository.find({
      relations: ['course', 'lessons', 'assignments'],
    });
  }

  async findOne(id: number): Promise<Modules> {
    const module = await this.moduleRepository.findOne({
      where: { id },
      relations: ['course', 'lessons', 'assignments'],
    });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    return module;
  }

  async update(id: number, updateModuleDto: UpdateModuleDto): Promise<Modules> {
    const module = await this.moduleRepository.findOne({ where: { id } });

    if (!module) {
      throw new NotFoundException(`Module with ID ${id} not found`);
    }

    if (updateModuleDto.courseId) {
      const course = await this.courseRepository.findOne({
        where: { id: updateModuleDto.courseId },
      });

      if (!course) {
        throw new NotFoundException(
          `Course with ID ${updateModuleDto.courseId} not found`,
        );
      }

      module.course = course;
    }

    Object.assign(module, updateModuleDto);
    return this.moduleRepository.save(module);
  }

  async remove(id: number): Promise<void> {
    const module = await this.findOne(id);
    await this.moduleRepository.remove(module);
  }
}
