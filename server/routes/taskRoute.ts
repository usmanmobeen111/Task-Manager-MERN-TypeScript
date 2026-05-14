import { Router } from "express";
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/taskControllers.ts";

const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/:id", getTask)
taskRouter.post("/create", createTask)
taskRouter.put("/:id", updateTask)
taskRouter.delete("/:id", deleteTask)

export default taskRouter