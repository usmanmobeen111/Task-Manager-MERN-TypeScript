import { FaBook } from "react-icons/fa6";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full h-20 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm flex items-center justify-between px-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="bg-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-200">
          <FaBook className="text-white" size={24} />
        </div>
        <h1 className="font-outfit font-black text-2xl tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Taskify
        </h1>
      </motion.div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
        <a href="#" className="hover:text-violet-600 transition-colors">Dashboard</a>
        <a href="#" className="hover:text-violet-600 transition-colors">Calendar</a>
        <a href="#" className="hover:text-violet-600 transition-colors">Settings</a>
      </div>
    </nav>
  );
};

export default Navbar;