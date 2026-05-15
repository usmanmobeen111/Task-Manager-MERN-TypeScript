import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full py-8 mt-20 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 font-medium">
          Made with ❤️ by <span className="text-violet-600 font-bold">Usman</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/usmanmobeen111"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-violet-600 transition-colors duration-300"
          >
            <FaGithub size={20} />
            <span className="font-semibold text-sm italic">usmanmobeen111</span>
          </a>
        </div>
        <div className="text-gray-400 text-xs tracking-wider uppercase">
          © {new Date().getFullYear()} Taskify Inc.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
