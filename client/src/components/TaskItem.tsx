import { type Task, toggleTaskCompletion, deleteTask, updateTask } from '../api/tasks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { CheckCircle, Circle, Trash2, Pencil } from 'lucide-react';
import { cn } from '../lib/utils';
import Modal from './ui/modal';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface TaskItemProps {
    task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description || '');

    const updateMutation = useMutation({
        mutationFn: () => updateTask(task.id, {
            title: editTitle,
            description: editDescription
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            setIsEditing(false);
        },
    });

    const handleSave = () => {
        if (!editTitle.trim()) return;
        updateMutation.mutate();
    };

    const toggleMutation = useMutation({
        mutationFn: () => toggleTaskCompletion(task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteTask(task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return (
        <div className={cn(
            "flex items-center justify-between p-4 rounded-lg border transition-colors",
            task.status === 'COMPLETED' ? "bg-muted/50 border-muted" : "bg-card border-border hover:border-primary/50"
        )}>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => toggleMutation.mutate()}
                    disabled={toggleMutation.isPending}
                    className="text-primary hover:text-primary/80 transition-colors"
                >
                    {task.status === 'COMPLETED' ? (
                        <CheckCircle className="w-6 h-6" />
                    ) : (
                        <Circle className="w-6 h-6" />
                    )}
                </button>
                <div>
                    <h3 className={cn(
                        "font-medium",
                        task.status === 'COMPLETED' && "line-through text-muted-foreground"
                    )}>
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className={cn(
                            "text-sm",
                            task.status === 'COMPLETED' ? "text-muted-foreground/70" : "text-muted-foreground"
                        )}>
                            {task.description}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">
                    Created: {new Date(task.createdAt).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsEditing(true)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <Pencil className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <Modal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                title="Edit Task"
            >
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Task title"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Task description (optional)"
                            className="min-h-[100px]"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={updateMutation.isPending || !editTitle.trim()}
                        >
                            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TaskItem;
