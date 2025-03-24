import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  
  imports: [PrismaModule, JwtModule.register({
    secret: process.env.JWT_SECRET, // ← lo tomará desde el .env
    signOptions: { expiresIn: '1d' }, // ← define tiempo de expiración
  })
  ], 
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Agregamos JwtStrategy aquí
})
export class AuthModule {}
