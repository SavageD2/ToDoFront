import React, { useState } from "react";
import "./TaskForm.css";

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority, dueDate });
    onClose();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Ajouter une tâche</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priorité</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Date limite</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
