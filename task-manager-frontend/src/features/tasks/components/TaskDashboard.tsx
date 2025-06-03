import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task, CreateTaskDto } from '../services/taskService';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useAuth } from '@/features/auth/context/AuthContext';

export default function TaskDashboard() {
  const { user, logout } = useAuth();
  const { 
    tasks, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskCompletion,
    fetchTasks 
  } = useTasks();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Manejar la creación de una nueva tarea
  const handleCreateTask = async (taskData: CreateTaskDto) => {
    const result = await createTask(taskData);
    if (result) {
      setShowAddForm(false);
    }
    return result;
  };

  // Manejar la edición de una tarea existente
  const handleUpdateTask = async (taskData: CreateTaskDto) => {
    if (!editingTask) return null;
    
    const result = await updateTask(editingTask.id, taskData);
    if (result) {
      setEditingTask(null);
    }
    return result;
  };

  // Manejar la eliminación de una tarea
  const handleDeleteTask = async (id: number) => {
    return deleteTask(id);
  };

  // Iniciar la edición de una tarea
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowAddForm(false);
  };

  // Cancelar la edición o creación
  const handleCancel = () => {
    setEditingTask(null);
    setShowAddForm(false);
  };

  // Filtrar tareas por estado (completadas/pendientes)
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestor de Tareas</h1>
          <p className="text-gray-600 mt-1">
            Bienvenido, {user?.name || user?.email}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setEditingTask(null);
              setShowAddForm(!showAddForm);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nueva Tarea
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
          <button 
            onClick={fetchTasks} 
            className="ml-2 underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Formulario para agregar o editar tareas */}
      {(showAddForm || editingTask) && (
        <div className="mb-8">
          <TaskForm
            task={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCancel}
            isEditing={!!editingTask}
          />
        </div>
      )}

      {/* Mostrar mensaje de carga */}
      {loading && !error && (
        <div className="flex justify-center my-8">
          <div className="text-gray-500">Cargando tareas...</div>
        </div>
      )}

      {/* Mostrar tareas pendientes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          Tareas Pendientes
          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
            {pendingTasks.length}
          </span>
        </h2>
        
        {!loading && pendingTasks.length === 0 ? (
          <div className="bg-gray-50 p-4 rounded-md text-gray-500 text-center">
            No tienes tareas pendientes. ¡Buen trabajo!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskCompletion}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mostrar tareas completadas */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            Tareas Completadas
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              {completedTasks.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleTaskCompletion}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
