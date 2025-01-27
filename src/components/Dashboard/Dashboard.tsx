import { useEffect, useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../api/taskApi";
import { Task } from "../../models/task.models";
import "./Dashboard.css";

const Dashboard: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
      const loadTasks = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedTasks = await fetchTasks();
          setTasks(fetchedTasks);
        } catch {
          setError("Une erreur s'est produite lors du chargement des tâches");
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
        const taskToEdit = tasks.find((task) => task.id === taskId);
        if (taskToEdit) {
          setSelectedTask(taskToEdit);
          setShowTaskForm(true);
        }
    };

    const handleSaveTask = async (
      taskData: Omit<Task, "id" | "status">,
      isEditing: boolean
    ) => {
      setError(null);
      try {
        if (isEditing && selectedTask) {
          const updatedTask = await updateTask(selectedTask.id, taskData);
          setTasks((prev) =>
          prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        } else {
          const newTask = await createTask({ ...taskData, status: "todo" });
          setTasks((prev) => [...prev, newTask]);
        }
      } catch {
        setError("Une erreur s'est produite lors de l'enregistrement de la tâche");
      } finally {
        setShowTaskForm(false);
      }
    };

    const handleDeleteTask = async (taskId: string) => {
        setError(null);
        try {
          await deleteTask(taskId);
          setTasks((prev) => prev.filter((task) => task.id !== taskId));
        } catch {
          setError("Une erreur s'est produite lors de la suppression de la tâche");
        }
    };


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mon Tableau de Bord</h1>
        <button className="add-task-btn" onClick={handleAddTask}>+ Ajouter une tâche</button>
      </div>
      {isLoading && <p>Chargement des tâches...</p>}
      {error && <p className="error-msg">{error}</p>}
      
      {showTaskForm && (
        <TaskForm task={selectedTask} onSave={handleSaveTask} onClose={() => setShowTaskForm(false)}  />
      )}
      <div className="task-summary">
       {["todo", "inProgress", "done"].map((status)=>(
          <TaskList
          key={status}
          tasks={tasks}
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
