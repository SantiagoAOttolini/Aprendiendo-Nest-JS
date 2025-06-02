import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../../generated/prisma';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // Registro de usuario: hashea la contraseña y guarda el usuario
  async register(
    email: string,
    password: string,
    name?: string,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('El email ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  }

  // Login: verifica email y contraseña, retorna JWT si es válido
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    // Genera un JWT (clave secreta simple para demo, pon una más segura en producción)
    const token = jwt.sign(
      { sub: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'supersecret',
      { expiresIn: '1d' }
    );
    return { token };
  }

  // Verifica y decodifica el JWT
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'supersecret');
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
