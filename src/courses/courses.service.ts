import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

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

  async searchCourses(category: string, keyword: string): Promise<Course[]> {
    const queryBuilder = this.courseRepository.createQueryBuilder('course');

    if (category) {
      queryBuilder.andWhere('course.category = :category', { category });
    }

    if (keyword) {
      queryBuilder.andWhere(
        'course.name ILIKE :keyword OR course.description ILIKE :keyword',
        { keyword: `%${keyword}%` },
      );
    }

    return await queryBuilder.getMany();
  }

  async update(
    id: number,
    updateCourseDto: Partial<CreateCourseDto>,
  ): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto);
    return this.findOneById(id);
  }

  async findOneById(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['modules'],
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
