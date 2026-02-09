import axios from 'axios';

export type TaskStatus = 'PENDING' | 'COMPLETED';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDto {
    title: string;
    description?: string;
}

export interface UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
}

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const getTasks = async (sortOrder: 'asc' | 'desc' = 'desc'): Promise<Task[]> => {
    const response = await api.get('/tasks', {
        params: { sort: sortOrder }
    });
    return response.data;
};

export const createTask = async (data: CreateTaskDto): Promise<Task> => {
    const response = await api.post('/tasks', data);
    return response.data;
};

export const updateTask = async (id: string, data: UpdateTaskDto): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
};

export const toggleTaskCompletion = async (id: string): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}/complete`);
    return response.data;
};
