import { Request, Response } from 'express';
import Project from '../models/Project';

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, members } = req.body;

    if (!name || !Array.isArray(members)) {
      return res.status(400).json({ message: 'Name and members are required' });
    }

    const existing = await Project.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Project already exists' });

    const newProject = new Project({ name, description, members });
    const saved = await newProject.save();
    const populated = await saved.populate('members', '-password');
    return res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate('members', '-password');
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { projectId, name, description, members } = req.body;

    if (!projectId) return res.status(400).json({ message: 'projectId required' });

    const updated = await Project.findByIdAndUpdate(
      projectId,
      { name, description, members },
      { new: true }
    ).populate('members', '-password');

    if (!updated) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;
    if (!projectId) return res.status(400).json({ message: 'projectId required' });

    const deleted = await Project.findByIdAndDelete(projectId);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err });
  }
};
