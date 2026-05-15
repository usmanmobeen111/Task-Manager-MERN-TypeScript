import { useEffect, useState, type ChangeEvent } from "react";
import type { Task, TaskForProps } from "../types";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const TaskForm = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}: TaskForProps) => {
  const [form, setForm] = useState<Task>({
    title: "",
    description: "",
    deadline: new Date(),
    priority: "medium",
    status: "pending",
    tags: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        deadline: initialData.deadline,
        priority: initialData.priority,
        status: initialData.status,
        tags: initialData.tags,
      });
    } else {
      setForm({
        title: "",
        description: "",
        deadline: new Date(),
        priority: "medium",
        status: "pending",
        tags: "",
      });
    }
  }, [initialData, visible]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "deadline" ? new Date(value) : value });
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl relative overflow-hidden z-10 border border-slate-100"
          >
            <div className="p-8 md:p-10">
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-slate-800">
                    {initialData ? "Edit Task" : "New Task"}
                  </h2>
                  <p className="text-slate-400 font-medium text-sm">Fill in the details below</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm"
                >
                  <FaXmark size={20} />
                </button>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Task Title</label>
                  <input
                    autoFocus
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-800 font-semibold placeholder:text-slate-300 focus:outline-none focus:border-violet-500/30 focus:bg-white transition-all shadow-sm"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="What needs to be done?"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Description</label>
                  <textarea
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-4 text-slate-800 font-semibold placeholder:text-slate-300 focus:outline-none focus:border-violet-500/30 focus:bg-white transition-all shadow-sm min-h-[120px] resize-none"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Add more context..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Deadline</label>
                    <input
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-slate-800 font-semibold focus:outline-none focus:border-violet-500/30 focus:bg-white transition-all shadow-sm"
                      type="date"
                      name="deadline"
                      value={
                        form.deadline instanceof Date
                          ? form.deadline.toISOString().split("T")[0]
                          : new Date(form.deadline).toISOString().split("T")[0]
                      }
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Tags (Comma separated)</label>
                    <input
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-slate-800 font-semibold placeholder:text-slate-300 focus:outline-none focus:border-violet-500/30 focus:bg-white transition-all shadow-sm"
                      type="text"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="work, hobby, urgent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Priority</label>
                    <select 
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-slate-800 font-semibold focus:outline-none focus:border-violet-500/30 focus:bg-white transition-all shadow-sm cursor-pointer appearance-none"
                      name="priority" 
                      value={form.priority} 
                      onChange={handleChange}
                    >
                      <option value="high">🔥 High Priority</option>
                      <option value="medium">⚡ Medium Priority</option>
                      <option value="low">🌱 Low Priority</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Status</label>
                    <select 
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-5 py-3.5 text-slate-800 font-semibold focus:outline-none focus:border-violet-500/30 focus:bg-white transition-all shadow-sm cursor-pointer appearance-none"
                      name="status" 
                      value={form.status} 
                      onChange={handleChange}
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="processing">⚙️ In Progress</option>
                      <option value="completed">✅ Completed</option>
                    </select>
                  </div>
                </div>

                <button
                  className="w-full bg-violet-600 px-6 py-5 text-white rounded-[1.5rem] font-black shadow-xl shadow-violet-200 hover:bg-violet-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  type="submit"
                >
                  <FaCheck />
                  <span>{initialData ? "Save Changes" : "Create Task"}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskForm;
