import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task.ts';

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
    console.log(req.query)

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

    res.json({message: "Tasks fetched successfully", tasks});

  } catch (error: any) {

    res.status(500).json({
      message: 'Error fetching tasks',
      error: error.message
    });

  }

};


export const getTask = async (req: Request, res: Response):Promise<void>=>{
  try {
    const {id} = req.params
    const task = await Task.findById(id)
    if(!task){
        res.status(404).json({message: "Task not found"})
        return
    }
    res.json(task)

  } catch (error: any) {
    res.status(500).json({
        message: "Error fetching task",
        error: error.message
    })
  }
}

export const createTask = async (req: Request, res: Response): Promise<void> =>{
    
    try{
        const {title, description, deadline, priority,tags, status } :ITask = req.body

        if(!title){
            res.status(400).json({message: "Title is required"})
            return
        }
        if(!description){
            res.status(400).json({message: "Description is required"})
            return
        }
        if(!deadline){
            res.status(400).json({message: "Deadline is required"})
            return
        }
        if(!priority){
            res.status(400).json({message: "Priority is required"})
            return
        }
        if(!tags){
            res.status(400).json({message: "Tags is required"})
            return
        }
        if(!status){
            res.status(400).json({message: "Status is required"})
            return
        }
        const task = await Task.create({
            title,
            description,
            deadline,
            priority,
            tags,
            status
        })
        res.json({message: "Task created successfully", task})

    }catch(error: any){
        console.log(error.message)
        res.status(500).json({
            message: "Error creating task",
            error: error.message
        })
    }
} 


export const updateTask = async (req: Request, res: Response): Promise<void>=>{
    try {
     const {title, description, deadline, priority, tags, status}: ITask = req.body
     const task = await Task.findById(req.params.id)
     if(!task){
        res.status(404).json({message: "Task not found"})
        return
     }
     if(title !== undefined){
        task.title = title
     }
     if(description !== undefined){
        task.description = description
     }
     if(deadline !== undefined){
        task.deadline = deadline
     }
     if(priority !== undefined){
        task.priority = priority
     }
     if(tags !== undefined){
        task.tags = tags
     }
     if(status !== undefined){
        task.status = status
     }   

     const updatedTask = await task.save()
     res.json({message: "Task updated successfully", updatedTask})
    } catch (error: any) {
        res.status(500).json({
            message: "Error updating task",
            error: error.message
        })
    }
}

export const deleteTask = async(req:Request, res:Response):Promise<void>=>{
    try {
        console.log("Deleting task with ID:", req.params.id)
        const task = await Task.findById(req.params.id)
        
    if(!task){
        res.status(404).json({message: "Task not found"})
        return
    }
    const deletedTask = await task.deleteOne()
    res.json({message: "Task deleted successfully", deletedTask})
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Error deleting task",
            error: error.message
        })
    }
}

export const updateTaskStatus = async(req:Request, res:Response):Promise<void>=>{
    try {
        const {status} = req.body
        const task = await Task.findById(req.params.id)
        if(!task){
            res.status(404).json({message: "Task not found"})
            return
        }
       task.status = status
       const updatedTask = await task.save()
       res.json({message: "Task status updated successfully", updatedTask})
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({
            message: "Error updating task status",
            error: error.message
        })
    }
}