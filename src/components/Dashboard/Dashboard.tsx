import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import "./Dashboard.css";

interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    status: "todo" | "inProgress" | "done";
}

const Dashboard: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([
        {
          id: "1",
          title: "Acheter du lait",
          description: "Aller au supermarché pour acheter du lait.",
          priority: "low",
          dueDate: "2025-01-30",
          status: "todo",
        },
        {
          id: "2",
          title: "Finaliser le rapport",
          description: "Rédiger et envoyer le rapport au client.",
          priority: "high",
          dueDate: "2025-01-25",
          status: "inProgress",
        },
        {
          id: "3",
          title: "Nettoyer la maison",
          description: "Faire le ménage dans le salon et la cuisine.",
          priority: "medium",
          dueDate: "2025-01-28",
          status: "done",
        },
      ]);

    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

    const handleSaveTask = (
      taskData: Omit<Task, "id" | "status">,
      isEditing: boolean
    ) => {
      if (isEditing && selectedTask) {
        setTasks((prev) =>
        prev.map((task) =>
          task.id === selectedTask.id? {...task,...taskData } : task
        ))
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          status: "todo",
          ...taskData,
        }
        setTasks((prev) => [...prev, newTask]);
      }
      setSelectedTask(null);
    };

    const handleDeleteTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id!== taskId));
    };


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mon Tableau de Bord</h1>
        <button className="add-task-btn" onClick={handleAddTask}>+ Ajouter une tâche</button>
      </div>
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
