import { getTasks } from "./api/task"
import Navbar from "./components/Navbar"

const App = () => {
  const tasks = getTasks();
  console.log(tasks);
  console.log("hello")
  return (
    <div>
      <Navbar/>
      
    </div>
  )
}

export default App