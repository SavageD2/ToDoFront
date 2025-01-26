import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";
import { Task, TaskListProps } from "../../models/task.models";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  category,
}) => {
  const filteredTasks: Task[] = tasks.filter((task) => task.status === category);

  return (
    <div className="task-list">
      <h2>
        {category === "todo"
          ? "À Faire"
          : category === "inProgress"
          ? "En Cours"
          : "Terminées"}
      </h2>
      {filteredTasks.length > 0 ? (
        <div className="task-items">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <p>Aucune tâche pour cette catégorie.</p>
      )}
    </div>
  );
};

export default TaskList;
