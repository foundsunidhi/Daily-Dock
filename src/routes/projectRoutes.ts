import { Router } from 'express';
import { createProject, getProjects, updateProject, deleteProject, } from '../controller/projectController';

const router = Router();

router.post('/create', (req, res) => {
  createProject(req, res);
});

router.get('/getProjects', (req, res) => {
  getProjects(req, res);
});

router.put('/update', (req, res) => {
  updateProject(req, res);
});

router.delete('/delete', (req, res) => {
  deleteProject(req, res);
});

export default router;
