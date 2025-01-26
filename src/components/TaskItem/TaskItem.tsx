import "./TaskItem.css";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: "todo" | "inProgress" | "done";
}

interface TaskItemProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className={`task-item ${task.priority}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p className="due-date">À rendre avant : {task.dueDate}</p>
      </div>
      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task.id)}>
          ✏️ Modifier
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
