import { Module } from '@nestjs/common';
import { ModuleService } from './modules.service';
import { ModuleController } from './modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Modules, Course])],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModulesModule {}
