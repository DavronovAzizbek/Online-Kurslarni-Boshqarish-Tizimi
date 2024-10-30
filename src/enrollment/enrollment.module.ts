import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment]), CoursesModule],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
})
export class EnrollmentModule {}
