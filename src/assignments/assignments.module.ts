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

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment, Result, User]),
    ResultsModule,
    UsersModule,
    ModulesModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
