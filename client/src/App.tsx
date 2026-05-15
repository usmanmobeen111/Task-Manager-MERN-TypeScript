import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import type { Task } from "./types";
import { createTask, deleteTask, getTasks, updateTask } from "./api/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data.tasks);
    } catch (error) {
      console.log("Error fetching");
    }
    finally{
        setLoading(false)
    }
  };

  const hadleAddTask = ():void=>{
    setSelectedTask(null)
    setFormVisible(true)
  }

  const handleEditTask = (task:Task) =>{
    setSelectedTask(task)
    setFormVisible(true)
  }

  const handleDeleteTask = async (id:string):Promise<void> =>{
    await deleteTask(id)
    await fetchTasks()
    
  }

  const handleFormSubit = async (task:Task):Promise<void> =>{
    if(selectedTask){
      await updateTask(selectedTask._id, task)
    }
    else{
      await createTask(task)
    }
    setFormVisible(false)
    await fetchTasks()
  }


  return (
    <div className="min-h-screen">
      <Navbar />
      <section>
        <div>
          <button onClick={hadleAddTask}>Add Task</button>
        </div>
        <div>
          {loading ?(
            <div>Loading...</div>
          ): (
            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask}/>
          )}
        </div>
        <TaskForm visible={formVisible} onClose={()=> setFormVisible(false)} onSubmit={handleFormSubit} initialData={selectedTask}/>
      </section>
    </div>
  );
};

export default App;
