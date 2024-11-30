import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { User } from 'src/users/entities/user.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(Modules)
    private moduleRepository: Repository<Modules>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
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
      deadline: createAssignmentDto.deadline,
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

  async submitResponse(
    userId: number,
    assignmentId: number,
    response: string,
  ): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi ID ${userId} topilmadi`);
    }

    const assignment = await this.assignmentRepository.findOne({
      where: { id: assignmentId },
      relations: ['module'],
    });
    if (!assignment) {
      throw new NotFoundException(`Topshiriq ID ${assignmentId} topilmadi`);
    }

    // Modul mavjudligini tekshirish
    if (!assignment.module) {
      throw new NotFoundException(
        `Topshiriq ID ${assignmentId} uchun modul topilmadi`,
      );
    }

    const isEnrolled = await this.enrollmentRepository.findOne({
      where: {
        user: { id: userId },
        course: { id: assignment.module.id },
      },
    });

    if (!isEnrolled) {
      throw new ForbiddenException(
        `Foydalanuvchi ushbu topshiriq uchun kursga yozilmagan`,
      );
    }
    if (assignment.response) {
      throw new ConflictException(
        `Foydalanuvchi ushbu topshiriqqa javob yuborgan`,
      );
    }

    assignment.response = response;
    return this.assignmentRepository.save(assignment);
  }
}
