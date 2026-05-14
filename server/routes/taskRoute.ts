import { Router } from "express";
import { getTask, getTasks, createTask } from "../controllers/taskControllers.ts";

const taskRouter = Router()

taskRouter.get("/", getTasks)
taskRouter.get("/:id", getTask)
taskRouter.post("/", createTask)

export default taskRouter