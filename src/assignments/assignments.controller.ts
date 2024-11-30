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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AssignmentService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(
    @Param('moduleId') moduleId: number,
    @Body() createAssignmentDto: CreateAssignmentDto,
  ): Promise<{ message: string; assignment: Assignment }> {
    createAssignmentDto.moduleId = moduleId;
    const assignment = await this.assignmentService.create(createAssignmentDto);
    return {
      message: 'Assignment successfully created ✅',
      assignment,
    };
  }

  @Post(':assignmentId/submit-response')
  async submitResponse(
    @Param('assignmentId') assignmentId: number,
    @Body('userId') userId: number,
    @Body('response') response: string,
  ): Promise<Assignment> {
    return this.assignmentService.submitResponse(
      userId,
      assignmentId,
      response,
    );
  }

  @Get()
  async findAll(@Param('moduleId') moduleId: number): Promise<Assignment[]> {
    return this.assignmentService.findAll(moduleId);
  }

  @Get(':id')
  async findOne(
    @Param('moduleId') moduleId: number,
    @Param('id') id: number,
  ): Promise<Assignment> {
    const assignment = await this.assignmentService.findOne(moduleId, id);
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found ❌`);
    }
    return assignment;
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('moduleId') moduleId: number,
    @Param('id') id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<{ message: string; assignment: Assignment }> {
    const assignment = await this.assignmentService.update(
      moduleId,
      id,
      updateAssignmentDto,
    );
    return {
      message: 'Assignment successfully updated ✅',
      assignment,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(
    @Param('moduleId') moduleId: number,
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    await this.assignmentService.remove(moduleId, id);
    return {
      message: 'Assignment successfully deleted ✅',
    };
  }
}
