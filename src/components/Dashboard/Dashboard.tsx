import { useState } from "react";
import TaskForm from "../TaskForm/TaskForm";
import "./Dashboard.css";

const Dashboard: React.FC = () => {

    const [showTaskForm, setShowTaskForm] = useState(false);

    const handleAddTask = () => setShowTaskForm(true);
    const handleCloseTaskForm = () => setShowTaskForm(false);

    const handleTaskSubmit = (task: {
        title: string;
        description: string;
        priority: string;
        dueDate: string;
    }) => {
        console.log(task);
    };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mon Tableau de Bord</h1>
        <button className="add-task-btn" onClick={handleAddTask}>+ Ajouter une tâche</button>
      </div>
      {showTaskForm && (
        <TaskForm onClose={handleCloseTaskForm} onSubmit={handleTaskSubmit} />
      )}
      <div className="task-summary">
        <div className="task-category">
          <h2>À Faire</h2>
          <p>3 tâches</p>
        </div>
        <div className="task-category">
          <h2>En Cours</h2>
          <p>5 tâches</p>
        </div>
        <div className="task-category">
          <h2>Terminées</h2>
          <p>10 tâches</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
