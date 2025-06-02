import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // Importa el módulo Prisma
import { UserModule } from './user/user.module'; // Importa el módulo de usuario
import { AuthModule } from './auth/auth.module'; // Importa el módulo de autenticación
import { TaskModule } from './task/task.module'; // Importa el módulo de tareas

@Module({
  imports: [PrismaModule, UserModule, AuthModule, TaskModule], // Agrega TaskModule para habilitar endpoints de tareas
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
