import { Router } from "express";
import { getTask, getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskControllers.ts";

const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/:id", getTask)
taskRouter.post("/create", createTask)
taskRouter.put("/:id", updateTask)
taskRouter.delete("/delete/:id", deleteTask)
taskRouter.put("/status/:id", updateTaskStatus)

export default taskRouter