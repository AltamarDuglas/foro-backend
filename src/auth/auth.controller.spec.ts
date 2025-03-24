import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: { email?: string; password?: string }) {
    console.log('Datos recibidos en login:', data); // 👀 Depuración

    if (!data.email || !data.password) {
      throw new BadRequestException('Email y password son requeridos');
    }

    return this.authService.login(data.email, data.password);
  }
}
