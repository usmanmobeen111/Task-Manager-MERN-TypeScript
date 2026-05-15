export interface Task{
    _id?:string,
    title:string,
    description?:string,
    deadline:Date,
    priority:string,
    status:string,
   tags?:string
}


export interface TaskForProps {
    visible: boolean,
    onClose: () => void,
    onSubmit:(task:Task)=>void,
    initialData?:Task
}

export interface TaskListProps{
    tasks: Task[],
    onEdit: (task:Task)=>void,
    onDelete: (id:string)=>void,

}


export interface TaskCardProps{
    title:string,
    description?:string,
    onDelete:()=>void,
    onEdit:()=>void,
}