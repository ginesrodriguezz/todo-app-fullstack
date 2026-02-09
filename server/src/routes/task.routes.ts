import { Router } from 'express';
import * as TaskController from '../controllers/task.controller';

const router = Router();

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/complete', TaskController.toggleTaskCompletion);

export default router;
