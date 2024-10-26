// src/auth/auth.dto.ts
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty({ message: 'Ism kiritilishi shart' })
  @MaxLength(30, { message: 'Ism 30 ta belgidan oshmasligi kerak' })
  name: string;

  @IsEmail({}, { message: "Email noto'g'ri formatda kiritilgan" })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @IsString()
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" })
  @MaxLength(20, { message: 'Parol 20 ta belgidan oshmasligi kerak' })
  password: string;
}

export class LoginDto {
  @IsEmail({}, { message: "Email noto'g'ri formatda kiritilgan" })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  password: string;
}
