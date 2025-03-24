import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: { nombre: string; email: string; password: string }) {
    return this.authService.register(data.nombre, data.email, data.password);
  }

  @Post('login')
async login(@Body() body) {
  const { email, password } = body;
  const result = await this.authService.login(email, password);

  return {
    token: result.token,
    usuario: {
      id: result.usuario.id,
      nombre: result.usuario.nombre,
      email: result.usuario.email,
      rol: result.usuario.rol,
    },
  };
}


  @Get('profile')
  @UseGuards(JwtAuthGuard) // Protegemos esta ruta con JWT
  getProfile(@Request() req) {
    return req.user; // Retorna los datos del usuario autenticado
  }
}
