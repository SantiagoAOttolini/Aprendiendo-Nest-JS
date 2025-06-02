import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '../../../generated/prisma';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // Listar todas las tareas del usuario autenticado
  async findAll(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { userId } });
  }

  // Crear una nueva tarea para el usuario autenticado
  async create(userId: number, data: { title: string; description?: string }): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  // Obtener una tarea específica del usuario
  async findOne(userId: number, id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  // Actualizar una tarea del usuario
  async update(userId: number, id: number, data: Partial<{ title: string; description: string; completed: boolean }>): Promise<Task> {
    const task = await this.findOne(userId, id);
    return this.prisma.task.update({ where: { id }, data });
  }

  // Eliminar una tarea del usuario
  async remove(userId: number, id: number): Promise<void> {
    const task = await this.findOne(userId, id);
    await this.prisma.task.delete({ where: { id } });
  }
}
