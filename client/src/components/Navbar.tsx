
import { FaBook } from "react-icons/fa6";
const Navbar = () => {
  return (
    <div className="flex h-24 items-center justify-center bg-gray-50 shadow">
        <FaBook className="text-violet-700" size={50} />
        <h1 className='font-bold text-4xl text-gray-700'>Taskify</h1>
    </div>
  )
}

export default Navbar