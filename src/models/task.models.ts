export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: "todo" | "inProgress" | "done";
}

export type CreateTaskInput = Pick<Task, "title" | "description" | "priority" | "dueDate" | "status">;


export interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  category: "todo" | "inProgress" | "done";
}
