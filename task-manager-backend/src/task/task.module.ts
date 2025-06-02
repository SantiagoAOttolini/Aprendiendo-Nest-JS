import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

// Módulo de tareas: agrupa el servicio y el controlador
@Module({
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
