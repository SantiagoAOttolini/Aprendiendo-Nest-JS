import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { TaskService, Task, CreateTaskDto, UpdateTaskDto } from '../services/taskService';

// Inicializar el servicio de tareas
const taskService = new TaskService();

export function useTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar todas las tareas
  const fetchTasks = useCallback(async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const fetchedTasks = await taskService.getTasks(token);
      setTasks(fetchedTasks);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Cargar tareas al inicializar el componente o cuando cambia el token
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Crear una nueva tarea
  const createTask = async (taskData: CreateTaskDto) => {
    if (!token) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const newTask = await taskService.createTask(taskData, token);
      setTasks(prevTasks => [...prevTasks, newTask]);
      return newTask;
    } catch (err: any) {
      setError(err.message || 'Error al crear la tarea');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar una tarea existente
  const updateTask = async (id: number, taskData: UpdateTaskDto) => {
    if (!token) return null;
    
    setLoading(true);
    setError(null);
    
    try {
      const updatedTask = await taskService.updateTask(id, taskData, token);
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === id ? updatedTask : task)
      );
      return updatedTask;
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la tarea');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id: number) => {
    if (!token) return false;
    
    setLoading(true);
    setError(null);
    
    try {
      await taskService.deleteTask(id, token);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la tarea');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Marcar una tarea como completada o no completada
  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    return updateTask(id, { completed });
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  };
}
