import express from 'express';
import {
  createTask,
  getTasksByProject,
  updateTask,
} from '../controller/taskController';

const router = express.Router();

router.post('/', createTask); 
router.post('/project', getTasksByProject); 
router.put('/:id', updateTask); 

export default router;
