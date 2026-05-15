import type { TaskCardProps } from "../types";
import { FaEdit, FaTrash, FaCalendarAlt, FaFlag } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskCard = ({
  title,
  description,
  tags,
  onDelete,
  onEdit,
}: TaskCardProps) => {
  const tagsArray: string[] = tags?.split(",").map((tag) => tag.trim()).filter(t => t !== "") || [];

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high": return "bg-rose-50 text-rose-600 border-rose-100";
      case "medium": return "bg-amber-50 text-amber-600 border-amber-100";
      case "low": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group w-full bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-violet-500/10 transition-colors" />
      
      <div className="flex justify-between items-start gap-4 z-10">
        <h3 className="text-xl font-black text-slate-800 capitalize leading-tight group-hover:text-violet-600 transition-colors">
          {title}
        </h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit}
            className="p-2.5 bg-violet-50 text-violet-600 rounded-xl hover:bg-violet-600 hover:text-white transition-all shadow-sm"
          >
            <FaEdit size={14} />
          </button>
          <button 
            onClick={onDelete}
            className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
        {description || "No description provided for this task."}
      </p>

      {tagsArray.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {tagsArray.map((tag, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-slate-100 group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-600 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-wide shadow-sm`}>
             <FaFlag size={10} />
             <span>Priority</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium bg-slate-50/50 px-2.5 py-1.5 rounded-lg">
          <FaCalendarAlt size={12} className="text-slate-300" />
          <span>Task Tracker</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
