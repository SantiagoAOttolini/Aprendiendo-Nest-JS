import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

// Guard para proteger rutas usando JWT
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No se encontró el header Authorization');
    }
    // Espera formato: Bearer <token>
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }
    try {
      // Verifica el token y lo adjunta al request
      const payload = this.authService.verifyToken(token);
      request['user'] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
