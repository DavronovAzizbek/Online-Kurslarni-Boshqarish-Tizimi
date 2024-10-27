import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UseGuards,
  Headers,
  UnauthorizedException,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/admin')
  async registerAdmin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.registerAdmin(createAuthDto);
  }

  @Post('register/user')
  async registerUser(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res() res: any,
  ) {
    const data = await this.authService.login(loginDto);
    res.status(200).json({ data });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMyData(@Req() req: Request) {
    return this.authService.getAllMyData(req.user);
  }

  @UseGuards(AuthGuard)
  @Post('refresh-token')
  async refreshAccessToken(
    @Headers('authorization') authHeader: string,
  ): Promise<{ accessToken: string }> {
    const refreshToken = authHeader.split(' ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    return this.authService.refreshAccessToken(refreshToken);
  }

  @UseGuards(AuthGuard)
  @Delete('logout')
  async logout(
    @Headers('authorization') authHeader: string,
  ): Promise<{ message: string }> {
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    return this.authService.logout(token);
  }
}
