import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,

    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(
    accessToken: string,
    { homework, assignmentId }: CreateResultDto,
  ) {
    const payload = this.jwtService.verify(accessToken);
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
      select: ['id', 'name', 'role', 'email'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found ❌');
    }

    const assignment = await this.assignmentRepository.findOneBy({
      id: assignmentId,
    });
    if (!assignment) {
      throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
    }

    const result = this.resultRepository.create({ homework, assignment, user });
    await this.resultRepository.save(result);

    delete result.user.password;
    delete result.user.refreshToken;

    return result;
  }

  async findAll(): Promise<Result[]> {
    const results = await this.resultRepository.find({
      relations: ['assignment', 'user'],
    });

    results.forEach((result) => {
      if (result.user) {
        delete result.user.password;
        delete result.user.refreshToken;
      }
    });

    return results;
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id },
      relations: ['assignment', 'user'],
    });
    if (!result) {
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    }

    if (result.user) {
      delete result.user.password;
      delete result.user.refreshToken;
    }

    return result;
  }

  async update(id: number, { teacherMessage, score }: UpdateResultDto) {
    const result = await this.resultRepository.findOneBy({ id });
    if (!result) {
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    }
    await this.resultRepository.update({ id }, { teacherMessage, score });
    return `Assignment updated successfully.`;
  }

  async remove(id: number): Promise<string> {
    const result = await this.resultRepository.findOneBy({ id });
    if (!result) {
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    }
    await this.resultRepository.delete(id);
    return 'Assignment deleted successfully ✅';
  }
}
