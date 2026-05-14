import { Request, Response } from 'express';
import Task from '../models/Task.js';

export const getTasks = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      status,
      priority,
      tags,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = req.query;

    // Dynamic filter object
    const filter: Record<string, any> = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (tags && typeof tags === 'string') {
      filter.tags = {
        $in: tags.split(',')
      };
    }

    if (search && typeof search === 'string') {

      filter.$or = [
        {
          title: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: search,
            $options: 'i'
          }
        }
      ];
    }

    // Dynamic sort object
    const sort: Record<string, 1 | -1> = {};

    if (typeof sortBy === 'string') {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const tasks = await Task.find(filter).sort(sort);

    res.json(tasks);

  } catch (error: any) {

    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message
    });

  }

};