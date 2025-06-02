import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../../generated/prisma';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Método para listar todos los usuarios
  async findAll(): Promise<User[]> {
    // Consulta todos los usuarios de la base de datos
    return await this.prisma.user.findMany();
  }
}
