import { Router } from "express";
import { getTasks } from "../controllers/taskControllers.ts";

const taskRouter = Router()

taskRouter.get("/", getTasks)

export default taskRouter