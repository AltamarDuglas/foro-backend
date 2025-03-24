import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // Registro de usuario
  async register(nombre: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        rol: 'usuario',
      },
    });
  }

  // Inicio de sesión
  async login(email: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    // Verificamos si existe y si la contraseña es válida
    const passwordValida = usuario && await bcrypt.compare(password, usuario.password);

    if (!usuario || !passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Generamos el token JWT
    const token = this.jwtService.sign({
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre, // 👈 AÑADE ESTO
    });
    
    

    // Retornamos token + usuario (para el frontend)
    return {
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}
