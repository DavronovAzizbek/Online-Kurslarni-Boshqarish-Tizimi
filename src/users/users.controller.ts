import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{ message: string; users: User[] }> {
    const users = await this.userService.findAll();
    return {
      message: 'Users retrieved successfully ✅',
      users: users,
    };
  }
}
