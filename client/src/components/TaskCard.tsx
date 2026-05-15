import type { TaskCardProps } from "../types";

const TaskCard = ({title, description, onDelete, onEdit}: TaskCardProps) => {
  return (
    <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default TaskCard