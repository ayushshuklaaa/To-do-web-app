import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8001/api',
});

export interface Task {
    id: number;
    title: string;
    priority: 'High' | 'Medium' | 'Low';
    completed: boolean;
    due_date?: string;
    list_id: number;
    created_at: string;
}

export interface TaskList {
    id: number;
    name: string;
    emoji: string;
    owner_id: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
}

export const apiService = {
    // Auth
    register: (payload: { name: string; email: string; password: string }) =>
        api.post<User>('/auth/register', payload),
    login: (payload: { email: string; password: string }) =>
        api.post<User>('/auth/login', payload),

    // Tasks
    getTasks: (listId: number) => api.get<Task[]>(`/tasks/?list_id=${listId}`),
    createTask: (task: { title: string; priority: string; list_id: number }) =>
        api.post<Task>('/tasks/', task),
    updateTask: (taskId: number, updates: Partial<Task>) =>
        api.patch<Task>(`/tasks/${taskId}`, updates),
    deleteTask: (taskId: number) => api.delete(`/tasks/${taskId}`),
    finishAllTasks: (listId: number) => api.patch<Task[]>(`/tasks/finish-all/${listId}`),

    // Lists
    getLists: (ownerId: number) => api.get<TaskList[]>(`/lists/?owner_id=${ownerId}`),
    createList: (list: { name: string; emoji: string; owner_id: number }) =>
        api.post<TaskList>('/lists/', list),
    deleteList: (listId: number) => api.delete(`/lists/${listId}`),

    // Users
    getUser: (userId: number) => api.get<User>(`/users/${userId}`),
};

export default api;
