import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = super.canActivate(context);

    if (result instanceof Observable) {
      return lastValueFrom(result).then(value => value ?? false); // Convertimos y aseguramos que devuelva boolean
    }

    return result as boolean;
  }
}
