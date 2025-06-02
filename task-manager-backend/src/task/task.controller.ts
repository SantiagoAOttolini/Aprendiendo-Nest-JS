import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Todas las rutas requieren JWT
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Listar todas las tareas del usuario autenticado
  @Get()
  async findAll(@Req() req: Request) {
    // El userId viene del JWT (payload)
    const userId = req['user'].sub;
    return this.taskService.findAll(userId);
  }

  // Crear una nueva tarea
  @Post()
  async create(
    @Req() req: Request,
    @Body('title') title: string,
    @Body('description') description?: string,
  ) {
    const userId = req['user'].sub;
    return this.taskService.create(userId, { title, description });
  }

  // Obtener una tarea específica
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = req['user'].sub;
    return this.taskService.findOne(userId, parseInt(id));
  }

  // Actualizar una tarea
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: { title?: string; description?: string; completed?: boolean },
  ) {
    const userId = req['user'].sub;
    return this.taskService.update(userId, parseInt(id), data);
  }

  // Eliminar una tarea
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const userId = req['user'].sub;
    await this.taskService.remove(userId, parseInt(id));
    return { message: 'Tarea eliminada' };
  }
}
