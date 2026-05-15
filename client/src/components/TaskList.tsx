import type { TaskListProps } from "../types";
import TaskCard from "./TaskCard";

const TaskList = ({tasks, onEdit, onDelete}: TaskListProps) => {
  return (
    <div>
        {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task, i)=>(
                <TaskCard key={i} title={task.title} description={task.description} onDelete={()=>onDelete(task._id!)} onEdit={()=>onEdit(task)}/>
            ))
        ) : (
            <div className="text-center py-10 text-gray-500">No tasks found.</div>
        )}
    </div>
  )
}

export default TaskList