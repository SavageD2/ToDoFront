import { useEffect, useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../api/taskApi";
import { Task, CreateTaskInput } from "../../models/task.models";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        setError("Une erreur s'est produite lors du chargement des tâches" + error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

 const handleEditTask = (taskId: string) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
        setSelectedTask(taskToEdit);
        setShowTaskForm(true);
    } else {
        setError("Tâche non trouvée pour l'édition");
    }
}

  const handleSaveTask = async (
    taskData: CreateTaskInput,
    isEditing: boolean
  ) => {
    setError(null);
  
    if (isEditing && !selectedTask?._id) {
      setError("L'ID de la tâche est manquant lors de l'édition");
      return;
    }
  
    try {
      let updatedTask: Task;
  
      if (isEditing && selectedTask && selectedTask._id) {
        updatedTask = await updateTask(selectedTask._id, taskData);
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else if (!isEditing) {
        const taskWithoutId = { ...taskData };
        updatedTask = await createTask(taskWithoutId);
        setTasks((prev) => [...prev, updatedTask]);
      } else {
        throw new Error("L'ID de la tâche est manquant pour la mise à jour");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de l'enregistrement de la tâche" + error);
      
    } finally {
      setShowTaskForm(false);
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    if (!taskId) {
      setError("L'ID de la tâche est manquant lors de la suppression.");
      return;
    }
    setError(null);
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      setError("Une erreur s'est produite lors de la suppression de la tâche" + error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mon Tableau de Bord</h1>
        <button className="add-task-btn" onClick={handleAddTask}>
          + Ajouter une tâche
        </button>
      </div>
      {isLoading && <p>Chargement des tâches...</p>}
      {error && <p className="error-msg">{error}</p>}

      {showTaskForm && (
        <TaskForm
          task={selectedTask}
          onSave={handleSaveTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}

      <div className="task-summary">
        {["todo", "inProgress", "done"].map((status) => (
          <TaskList
            key={status}
            tasks={tasks.filter((task) => task.status === status)}
            category={status as Task["status"]}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
