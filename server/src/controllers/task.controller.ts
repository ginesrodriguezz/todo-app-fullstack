import { Request, Response } from 'express';
import * as TaskService from '../services/task.service';
import { z } from 'zod';

const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const sort = req.query.sort as 'asc' | 'desc' | undefined;
        const tasks = await TaskService.getAllTasks(sort);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const data = createTaskSchema.parse(req.body);
        const task = await TaskService.createTask(data);
        res.status(201).json(task);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
        } else {
            res.status(500).json({ error: 'Failed to create task' });
        }
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const data = createTaskSchema.parse(req.body);
        const task = await TaskService.updateTask(id, data);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        await TaskService.deleteTask(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

export const toggleTaskCompletion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        const task = await TaskService.toggleTaskCompletion(id);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle task completion' });
    }
};
