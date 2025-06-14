<<<<<<< HEAD
import Task from '../models/Task';
=======
import Task from '../models/taskModel';
>>>>>>> cbe9866 (add project files)
import { Request, Response } from 'express';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { year, month, week } = req.query;
    const query: any = {};
    if (year) query.year = Number(year);
    if (month) query.month = Number(month);
    if (week) query.week = Number(week);

    const tasks = await Task.find(query);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

export const createOrUpdateTask = async (req: Request, res: Response) => {
  try {
    const { year, month, week, data } = req.body;
    const task = await Task.findOneAndUpdate(
      { year, month, week },
      { year, month, week, data },
      { new: true, upsert: true }
    );
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error saving task' });
  }
};
