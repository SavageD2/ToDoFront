import axios from 'axios';
import { Task, CreateTaskInput } from '../models/task.models';
import { getToken } from '../services/authService';

const API_URL: string = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";


export const fetchTasks = async (): Promise<Task[]> => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.map((task: Task) => task);
    
}

export const createTask = async (task: CreateTaskInput): Promise<Task> => {
    const token = getToken();
    const response = await axios.post(`${API_URL}/tasks`, task, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const updateTask = async (taskId: string, taskData: CreateTaskInput): Promise<Task> => {
    const token = getToken();
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.data) {
      throw new Error("Impossible de mettre à jour la tâche");
    }
    return response.data;
  };
  

export const deleteTask = async (id: string): Promise<void> => {
    const token = getToken();
    await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
