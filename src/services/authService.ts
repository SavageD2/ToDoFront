import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api";

export const login = async (email:string, password:string): Promise<string> => {
    const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password
    });
    const {token} = response.data;
    localStorage.setItem('token', token);
    return token;
};

export const register = async (username: string, email: string, password: string): Promise<void> => {
    await axios.post(`${API_URL}/users/register`, {
        username,
        email,
        password
    });
}

export const logout = () => {
    localStorage.removeItem('token');
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};