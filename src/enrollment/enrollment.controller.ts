import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UnauthorizedException,
  Get,
  Param,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { RolesUserGuard } from 'src/auth/RolesUserGuard';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('create')
  @UseGuards(RolesUserGuard)
  async createEnrollment(
    @Request() req,
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<{ message: string; courseName?: string; lessons?: any[] }> {
    const user = req.user;

    if (user.role !== 'user') {
      throw new UnauthorizedException(
        'Only regular users can enroll in courses ❌',
      );
    }

    const enrollment = await this.enrollmentService.createEnrollment(
      user.id,
      createEnrollmentDto,
    );

    return {
      message: 'Enrollment created successfully! ✅',
      courseName: enrollment.course.name,
      lessons: enrollment.course.lessons,
    };
  }

  @UseGuards(RolesUserGuard)
  @Get(':courseId/lessons')
  async getLessonsByCourseId(
    @Param('courseId') courseId: number,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.enrollmentService.getLessonsByCourseId(userId, courseId);
  }
}
