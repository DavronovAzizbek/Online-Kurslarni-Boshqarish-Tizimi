import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AssignmentService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { Result } from 'src/results/entities/result.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() createAssignmentDto: CreateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get('all')
  async findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Assignment> {
    const assignment = await this.assignmentService.findOne(id);
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post(':assignmentId/submit')
  submitAssignment(
    @Param('assignmentId') assignmentId: number,
    @Body('userId') userId: number,
    @Body('score') score: number,
  ) {
    return this.assignmentService.submitAssignment(userId, assignmentId, score);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id/grade')
  gradeAssignment(
    @Param('id') id: number,
    @Body('score') score: number,
  ): Promise<Result> {
    return this.assignmentService.gradeAssignment(id, score);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    return this.assignmentService.update(id, updateAssignmentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.assignmentService.remove(id);
  }
}
