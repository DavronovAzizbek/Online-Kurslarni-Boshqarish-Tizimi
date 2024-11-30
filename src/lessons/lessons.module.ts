import { Module } from '@nestjs/common';
import { LessonService } from './lessons.service';
import { LessonController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Modules])],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}
