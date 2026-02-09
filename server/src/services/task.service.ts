import { PrismaClient, TaskStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTasks = async (sortOrder: 'asc' | 'desc' = 'desc') => {
    return await prisma.task.findMany({
        orderBy: { createdAt: sortOrder },
    });
};

export const createTask = async (data: { title: string; description?: string }) => {
    return await prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            status: TaskStatus.PENDING,
        },
    });
};

export const updateTask = async (id: string, data: { title: string; description?: string }) => {
    return await prisma.task.update({
        where: { id },
        data,
    });
};

export const deleteTask = async (id: string) => {
    return await prisma.task.delete({
        where: { id },
    });
};

export const toggleTaskCompletion = async (id: string) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new Error('Task not found');

    const newStatus = task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING;

    return await prisma.task.update({
        where: { id },
        data: { status: newStatus },
    });
};
