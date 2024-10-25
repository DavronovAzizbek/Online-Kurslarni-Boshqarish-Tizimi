import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [AuthModule, AdminModule, CoursesModule, ModulesModule, LessonsModule, AssignmentsModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
