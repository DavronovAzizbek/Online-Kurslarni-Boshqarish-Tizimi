import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './courses/courses.module';
import { AssignmentModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Enrollment } from './enrollment/entities/enrollment.entity';
import { Lesson } from './lessons/entities/lesson.entity';
import { Modules } from './modules/entities/module.entity';
import { Assignment } from './assignments/entities/assignment.entity';
import { Result } from './results/entities/result.entity';
import { ModulesModule } from './modules/modules.module';
import { LessonModule } from './lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: +process.env.DATABASE_PORT || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'azizbek002',
      database: process.env.DATABASE_NAME || 'exam',
      entities: [User, Course, Enrollment, Lesson, Modules, Assignment, Result],
      synchronize: true,
    }),
    AuthModule,
    CourseModule,
    AssignmentModule,
    ResultsModule,
    UsersModule,
    EnrollmentModule,
    ModulesModule,
    LessonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
