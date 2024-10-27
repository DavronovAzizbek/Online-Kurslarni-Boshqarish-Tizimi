import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getResultsByUser(userId: number): Promise<Result[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Foydalanuvchi ID ${userId} topilmadi ❌`);
    }
    return this.resultRepository.find({
      where: { user: { id: userId } },
      relations: ['assignment'],
    });
  }

  async getTotalScoreByUser(userId: number): Promise<number> {
    const results = await this.getResultsByUser(userId);
    return results.reduce((total, result) => total + result.score, 0);
  }
}
