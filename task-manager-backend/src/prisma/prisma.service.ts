import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

// PrismaService extiende PrismaClient para usarlo en toda la app
// Implementa OnModuleInit y OnModuleDestroy para manejar la conexión
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect(); // Conecta a la base de datos al iniciar el módulo
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta cuando el módulo se destruye
  }
}
