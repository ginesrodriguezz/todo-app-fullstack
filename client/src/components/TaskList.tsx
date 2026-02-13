import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../api/tasks';
import TaskItem from './TaskItem';
import { Button } from './ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

const TaskList: React.FC = () => {
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
    const { data: tasks, isLoading, isError } = useQuery({
        queryKey: ['tasks', sortOrder],
        queryFn: async () => {
            const data = await getTasks(sortOrder);
            console.log('Fetched tasks:', data); // Debugging
            return data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 p-8 bg-red-50 rounded-lg border border-red-100">
                <p>Failed to load tasks. Please ensure the backend is running.</p>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <p>No tasks found. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="gap-2"
                >
                    {sortOrder === 'desc' ? (
                        <>
                            <ArrowDown className="w-4 h-4" />
                            Newest First
                        </>
                    ) : (
                        <>
                            <ArrowUp className="w-4 h-4" />
                            Oldest First
                        </>
                    )}
                </Button>
            </div>
            {Array.isArray(tasks) ? (
                tasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))
            ) : (
                <div className="text-red-500">
                    Error: Unexpected data format received from server.
                </div>
            )}
        </div>
    );
};

export default TaskList;
