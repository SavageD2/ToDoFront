import { useState, useEffect } from "react";
import "./TaskForm.css";
import { Task } from "../../models/task.models";

type TaskStatus = "todo" | "inProgress" | "done";

interface TaskFormProps {
  task: Task | null;
  onSave: (task: Task, isEditing: boolean) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");

  useEffect(() => {
    if (task) {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setPriority(task?.priority || "medium");
      const formattedDueDate = task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "";
      setDueDate(formattedDueDate);
      setStatus(task?.status || "todo");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setStatus("todo");
    }
  }, [task]);

  if (!task && task !== null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask: Task = {
      _id: task?._id || "",
      title,
      description,
      priority,
      dueDate,
      status,
    };

    onSave(updatedTask, !!task);
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

          <label htmlFor="status">Statut</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="todo">À Faire</option>
            <option value="inProgress">En Cours</option>
            <option value="done">Terminée</option>
          </select>

          <div className="task-form-buttons">
            <button type="submit">{task ? "Enregistrer" : "Ajouter"}</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
