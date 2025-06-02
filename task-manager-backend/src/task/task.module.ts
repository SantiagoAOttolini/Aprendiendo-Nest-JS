import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

// Módulo de tareas: agrupa el servicio y el controlador
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [AuthModule], // Importa AuthModule para acceso a AuthService
  providers: [TaskService, JwtAuthGuard],
  controllers: [TaskController],
})
export class TaskModule {}
