import { useEffect, useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Task } from "./types";
import { createTask, deleteTask, getTasks, updateTask } from "./api/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaFilter } from "react-icons/fa6";

const App = () => {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");

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
    } finally {
      setLoading(false);
    }
  };

  const hadleAddTask = (): void => {
    setSelectedTask(null);
    setFormVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setFormVisible(true);
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    await deleteTask(id);
    await fetchTasks();
  };

  const handleFormSubit = async (task: Task): Promise<void> => {
    if (selectedTask) {
      await updateTask(selectedTask._id!, task);
    } else {
      await createTask(task);
    }
    setFormVisible(false);
    await fetchTasks();
  };

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "processing" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="min-h-screen font-outfit bg-[#f8fafc] text-slate-900 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black tracking-tight mb-2"
            >
              My Tasks
            </motion.h2>
            <p className="text-slate-500 font-medium">Manage and organize your productivity</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={hadleAddTask}
            className="flex items-center justify-center gap-2 bg-violet-600 px-6 py-3.5 text-white rounded-2xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all group"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Task</span>
          </motion.button>
        </header>

        {/* Filter Bar */}
        <section className="mb-10 overflow-x-auto pb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-slate-200 text-slate-400 mr-2 shadow-sm">
              <FaFilter size={14} />
              <span className="text-xs font-bold uppercase tracking-wider">Filter</span>
            </div>
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap shadow-sm border ${
                  filter === opt.value
                    ? "bg-violet-600 text-white border-violet-600 shadow-violet-100"
                    : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        {/* Task Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
              <p className="text-slate-400 font-medium animate-pulse">Loading your workspace...</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />

      <TaskForm
        visible={formVisible}
        onClose={() => setFormVisible(false)}
        onSubmit={handleFormSubit}
        initialData={selectedTask}
      />
    </div>
  );
};

export default App;
