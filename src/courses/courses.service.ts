import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['modules'] });
  }

  async searchCourses(nameFilter: string): Promise<Course[]> {
    if (!nameFilter) {
      return this.courseRepository.find(); // Agar filter bo'sh bo'lsa, barcha kurslarni qaytar
    }
    // Boshidan kelishi uchun LIKE shartini o'rnatamiz
    const courses = await this.courseRepository.find({
      where: {
        name: Like(`${nameFilter}%`), // Faqat boshida keladiganlar
      },
    });
    return courses;
  }

  async update(
    id: number,
    updateCourseDto: Partial<CreateCourseDto>,
  ): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOneById(id);
  }

  async findOneById(
    id: number,
    options?: { relations?: string[] },
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: options?.relations || [],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async remove(id: number): Promise<string> {
    const result = await this.courseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return `Course with ID ${id} successfully deleted`;
  }
}
