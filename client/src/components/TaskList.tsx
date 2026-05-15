import type { TaskListProps } from "../types";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";
import { FaInbox } from "react-icons/fa6";

const TaskList = ({ tasks, onEdit, onDelete }: TaskListProps) => {
  return (
    <div className="w-full">
      {Array.isArray(tasks) && tasks.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              tags={task.tags}
              onDelete={() => onDelete(task._id!)}
              onEdit={() => onEdit(task)}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-slate-400"
        >
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <FaInbox size={48} className="text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-600 mb-2">No tasks found</h3>
          <p className="text-sm font-medium">Try adjusting your filters or add a new task to get started.</p>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;