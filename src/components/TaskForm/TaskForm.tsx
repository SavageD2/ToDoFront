import { useState, useEffect } from "react";
import "./TaskForm.css";
import { Task } from "../../models/task.models";

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Omit<Task, "id" | "status">, isEditing: boolean) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, description, priority, dueDate };
    onSave(newTask, !!task);
    onClose();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <h2>{task ? "Modifier la tâche" : "Nouvelle tâche"}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="priority">Priorité</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>

          <label htmlFor="dueDate">Date limite</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <div className="task-form-buttons">
            <button type="submit">{task ? "Enregistrer" : "Ajouter"}</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
