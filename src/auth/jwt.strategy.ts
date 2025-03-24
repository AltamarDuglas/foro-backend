import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header
      ignoreExpiration: false, // No permite tokens expirados
      secretOrKey: 'secreto_jwt', // Clave secreta para verificar el token
    });
  }

  async validate(payload: { id: number; email: string; nombre: string; rol: string }) {
    return {
      id: payload.id,
      email: payload.email,
      nombre: payload.nombre,
      rol: payload.rol,
    };
  }
  
  
  
}
