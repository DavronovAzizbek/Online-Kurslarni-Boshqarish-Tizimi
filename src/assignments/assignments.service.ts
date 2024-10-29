import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const { moduleId, ...rest } = createAssignmentDto;
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
    });
    if (!module) {
      throw new NotFoundException(`Module with ID ${moduleId} not found`);
    }
    const assignment = this.assignmentRepository.create({
      ...rest,
      module,
    });
    return this.assignmentRepository.save(assignment);
  }

  async findAll(moduleId: number): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      where: { module: { id: moduleId } },
    });
  }

  async findOne(moduleId: number, id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id, module: { id: moduleId } },
    });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  async update(
    moduleId: number,
    id: number,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assignment = await this.findOne(moduleId, id);
    Object.assign(assignment, updateAssignmentDto);
    return this.assignmentRepository.save(assignment);
  }

  async remove(moduleId: number, id: number): Promise<void> {
    const assignment = await this.findOne(moduleId, id);
    await this.assignmentRepository.remove(assignment);
  }
}
