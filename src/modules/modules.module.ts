import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleController } from './modules.controller';
import { ModuleService } from './modules.service';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Course, Lesson])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModulesModule {}
