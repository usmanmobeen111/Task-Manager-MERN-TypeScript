import { useEffect, useState, type ChangeEvent } from "react"
import type { Task, TaskForProps } from "../types"


const TaskForm = ({visible, onClose, onSubmit, initialData}: TaskForProps) => {
  const [form, setForm] = useState<Task>({
    title:"",
    description: "",
    deadline: new Date(),
    priority: "",
    status: "",
    tags: ""
  })

  useEffect(()=>{
    if(initialData){
        setForm({
            title:initialData.title,
            description:initialData.description,
            deadline:initialData.deadline,
            priority:initialData.priority,
            status:initialData.status,
            tags:initialData.tags
        })
    }
    else{
        setForm({
            title:"",
            description: "",
            deadline: new Date(),
            priority: "medium",
            status: "pending",
            tags: ""
        })
    }
  }, [initialData, visible])

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const { name, value } = e.target;
    setForm({...form, [name]: name === 'deadline' ? new Date(value) : value})
  }

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!form.title.trim()) return
    onSubmit(form)
  }
  return (
    <>
    {visible &&(
      <div>
        <div>
          <button onClick={onClose}>x</button>
          <h2>{initialData ? "Edit Task": "Add Task"}</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" name="title" value={form.title} onChange={handleChange} />
              <input type="text" name="description" value={form.description} onChange={handleChange} />
              <input type="date" name="deadline" value={form.deadline instanceof Date ? form.deadline.toISOString().split('T')[0] : new Date(form.deadline).toISOString().split('T')[0]} onChange={handleChange} />
              <input type="text" name="priority" value={form.priority} onChange={handleChange} />
              <input type="text" name="status" value={form.status} onChange={handleChange} />
              <input type="text" name="tags" value={form.tags} onChange={handleChange} />
            </div>
            <button type="submit">{initialData ? "Update Task": "Add Task"}</button>
          </form>
        </div>
      </div>
    )}
    </>
  )
}

export default TaskForm