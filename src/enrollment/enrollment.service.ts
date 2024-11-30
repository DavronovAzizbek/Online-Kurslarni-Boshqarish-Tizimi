import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Enrollment } from './entities/enrollment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async createEnrollment(
    userId: number,
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<{
    course: any;
    message: string;
    courseName: string;
    lessons: any[];
  }> {
    const course = await this.courseRepository.findOne({
      where: { id: createEnrollmentDto.courseId },
      relations: ['modules', 'modules.lessons'],
    });

    if (!course) {
      throw new NotFoundException('Course not found ❌');
    }

    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: createEnrollmentDto.courseId },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('User already enrolled in this course ❌');
    }

    const enrollment = new Enrollment();
    enrollment.user = { id: userId } as any;
    enrollment.course = course;
    await this.enrollmentRepository.save(enrollment);

    const lessons = course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        contentType: lesson.contentType,
      })),
    );

    return {
      course,
      message: 'Enrollment created successfully! ✅',
      courseName: course.name,
      lessons,
    };
  }

  async getLessonsByCourseId(userId: number, courseId: number): Promise<any[]> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: courseId },
      },
      relations: ['course', 'course.modules', 'course.modules.lessons'],
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found for this course ❌');
    }

    const lessons = enrollment.course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        contentType: lesson.contentType,
      })),
    );

    return lessons;
  }
}
