export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: "todo" | "inProgress" | "done";
}

export interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  category: "todo" | "inProgress" | "done";
}

// export interface TaskFormProps {
//     isEditing: boolean;
//     taskToEdit?: {
//       id: string;
//       title: string;
//       description: string;
//       priority: string;
//       dueDate: string;
//       status: string;
//     };
//     onSave: (task: {
//       id?: string;
//       title: string;
//       description: string;
//       priority: string;
//       dueDate: string;
//       status: string;
//     }) => void;
//     onClose: () => void;
//   }