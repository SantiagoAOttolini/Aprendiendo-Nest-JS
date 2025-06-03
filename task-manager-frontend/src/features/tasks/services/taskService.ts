// Definición de la interfaz Task
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Interfaz para crear una nueva tarea
export interface CreateTaskDto {
  title: string;
  description?: string;
}

// Interfaz para actualizar una tarea
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Clase de servicio para manejar las operaciones CRUD de tareas
export class TaskService {
  private baseUrl = 'http://localhost:3001/tasks';

  // Método para obtener todas las tareas
  async getTasks(token: string): Promise<Task[]> {
    const response = await fetch(this.baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las tareas');
    }

    return response.json();
  }

  // Método para obtener una tarea por ID
  async getTaskById(id: number, token: string): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la tarea');
    }

    return response.json();
  }

  // Método para crear una nueva tarea
  async createTask(task: CreateTaskDto, token: string): Promise<Task> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Error al crear la tarea');
    }

    return response.json();
  }

  // Método para actualizar una tarea
  async updateTask(id: number, task: UpdateTaskDto, token: string): Promise<Task> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la tarea');
    }

    return response.json();
  }

  // Método para eliminar una tarea
  async deleteTask(id: number, token: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }
  }
}
