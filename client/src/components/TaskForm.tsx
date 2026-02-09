import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../api/tasks';
import { Button } from './ui/button';
import { Input } from './ui/input';

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setTitle('');
            setDescription('');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        mutation.mutate({ title, description });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Input
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Adding...' : 'Add Task'}
                </Button>
            </div>
            {mutation.isError && <p className="text-red-500 text-sm mt-2">Error creating task</p>}
        </form>
    );
};

export default TaskForm;
