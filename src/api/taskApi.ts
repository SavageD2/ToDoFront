import axios from 'axios';
import { Task, CreateTaskInput } from '../models/task.models';

const API_URL: string = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";


export const fetchTasks = async (): Promise<Task[]> => {
    const response = await axios.get(API_URL)
    return response.data;
}

export const createTask = async (task: CreateTaskInput): Promise<Task> => {
    const response = await axios.post(API_URL, task);
    return response.data;
}

export const updateTask = async (id:string, task:Partial<Task>): Promise<Task> => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response.data;
}

export const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
}