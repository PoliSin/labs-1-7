import { Router, Request, Response } from 'express';
import Task from '../models/taskModel';

const router = Router();

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req: Request<{ id: string }, any, { year: number; month: number; week: number; data: Record<string, string> }>, res: Response) => {
  try {
    const { id } = req.params;
    const { year, month, week, data } = req.body;

    if (!year || !month || !week || !data) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { id },
      { id, year, month, week, data },
      { new: true, upsert: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
