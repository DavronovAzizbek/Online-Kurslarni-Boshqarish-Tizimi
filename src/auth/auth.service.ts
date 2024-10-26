// src/auth/auth.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException(
        'Bunday foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    return {
      message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'Noto‘g‘ri email yoki parol',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Refresh tokenni foydalanuvchi yozuviga saqlaymiz
    user.refreshToken = refreshToken;
    await this.usersRepository.save(user);

    return {
      message: 'Tizimga muvaffaqiyatli kirildi',
      accessToken,
      refreshToken,
    };
  }

  async logout() {
    return { message: 'Tizimdan muvaffaqiyatli chiqildi' };
  }

  async refreshAccessToken(refreshToken: string) {
    // Foydalanuvchini refresh tokeni orqali topamiz
    const user = await this.usersRepository.findOne({
      where: { refreshToken },
    });

    if (!user) {
      throw new HttpException(
        'Yaroqsiz refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Yangi access tokenni yaratamiz
    const newAccessToken = this.generateAccessToken(user);

    return { accessToken: newAccessToken };
  }

  private generateAccessToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '15m', // Access token amal qilish muddati
    });
  }

  private generateRefreshToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: '7d', // Refresh token amal qilish muddati
    });
  }
}
