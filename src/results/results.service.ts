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

  // Yangi natija yaratish
  async create(
    accessToken: string,
    { homework, assignmentId }: CreateResultDto,
  ) {
    try {
      const payload = this.jwtService.verify(accessToken);
      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const assignment = await this.assignmentRepository.findOneBy({
        id: assignmentId,
      });
      if (!assignment)
        throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);

      // Yangi `Result` obyekti yaratish
      const result = this.resultRepository.create({
        homework,
        assignment,
        user,
      } as Partial<Result>);

      await this.resultRepository.save(result);
      return result;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  // Barcha natijalarni olish
  async findAll(): Promise<Result[]> {
    const result = await this.resultRepository.find({
      relations: ['assignment', 'user'],
    });
    return result;
  }

  // ID bo‘yicha natija olish
  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id },
      relations: ['assignment', 'user'],
    });
    if (!result)
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    return result;
  }

  // Natijani yangilash
  async update(id: number, { teacherMessage, score }: UpdateResultDto) {
    const result = await this.resultRepository.findOneBy({ id });
    if (!result)
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    await this.resultRepository.update({ id }, { teacherMessage, score });
    return `Assignment updated successfully.`;
  }

  // Natijani o‘chirish
  async remove(id: number): Promise<string> {
    const result = await this.resultRepository.findOneBy({ id });
    if (!result) {
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    }
    await this.resultRepository.delete(id);
    return 'Assignment deleted successfully.';
  }
}
