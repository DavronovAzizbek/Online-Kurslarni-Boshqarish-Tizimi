import { Module } from '@nestjs/common';
import { AssignmentService } from './assignments.service';
import { AssignmentController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Result } from 'src/results/entities/result.entity';
import { ResultsModule } from 'src/results/results.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { ModulesModule } from 'src/modules/modules.module';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, Result, User, Enrollment]),
    ResultsModule,
    UsersModule,
    ModulesModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
