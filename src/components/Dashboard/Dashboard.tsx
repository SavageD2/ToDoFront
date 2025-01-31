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
    console.log("Tâche à modifier ID:", taskId);
    const taskToEdit = tasks.find((task) => task._id === taskId);
    if (taskToEdit) {
        console.log("Tâche sélectionnée pour modification:", taskToEdit);
        setSelectedTask(taskToEdit);
        setShowTaskForm(true);
    } else {
        console.error("Aucune tâche trouvée avec l'ID:", taskId);
    }
}

  const handleSaveTask = async (
    taskData: CreateTaskInput,
    isEditing: boolean
  ) => {
    setError(null);
    console.log("Données à sauvegarder:", taskData);
  
    if (isEditing && !selectedTask?._id) {
      setError("L'ID de la tâche est manquant lors de l'édition");
      console.error("Erreur: L'ID de la tâche est manquant.");
      return;
    }
  
    try {
      let updatedTask: Task;
  
      if (isEditing && selectedTask && selectedTask._id) {
        console.log("ID de la tâche à éditer:", selectedTask._id);
        updatedTask = await updateTask(selectedTask._id, taskData);
        console.log("Tâche mise à jour:", updatedTask);
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else if (!isEditing) {
        const taskWithoutId = { ...taskData };
        updatedTask = await createTask(taskWithoutId);
        console.log("Nouvelle tâche créée:", updatedTask);
        setTasks((prev) => [...prev, updatedTask]);
      } else {
        throw new Error("L'ID de la tâche est manquant pour la mise à jour");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de l'enregistrement de la tâche");
      console.error("Erreur lors de la sauvegarde:", error);
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
      console.log("Suppression de la tâche ID:", taskId);
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      setError("Une erreur s'est produite lors de la suppression de la tâche");
      console.error("Erreur lors de la suppression:", error);
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
