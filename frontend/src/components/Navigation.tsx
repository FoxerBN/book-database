// src/components/Navigation.tsx
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaBook } from "react-icons/fa6";
const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-xl -rotate-25 opacity-75 font-bold text-white">
        <FaBook />
        </Link>
        <div className='flex items-center gap-3'>
        <p className='text-xs text-gray-300 hover:text-amber-400 cursor-pointer'>Richard</p>
        <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
          <FaUser className="text-xs" />
          <span className='text-xs'>Login</span>
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
