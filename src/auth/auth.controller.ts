// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return {
      message: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi',
      user: result.user, // Foydalanuvchi ma'lumotlari (id, name, email)
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      message: 'Tizimga muvaffaqiyatli kirildi',
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    };
  }

  @Post('logout')
  async logout() {
    // Foydalanuvchini tizimdan chiqishi
    return { message: 'Tizimdan muvaffaqiyatli chiqildi' };
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const result = await this.authService.refreshAccessToken(refreshToken);
    return {
      message: 'Access token muvaffaqiyatli yangilandi',
      accessToken: result.accessToken,
    };
  }
}
