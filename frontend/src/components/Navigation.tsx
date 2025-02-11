// src/components/Navigation.tsx
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold text-white">
          MyApp
        </Link>
        <div className='flex items-center gap-3'>
        <p className='text-xs text-gray-300 hover:text-amber-400 cursor-pointer'>Richard</p>
        <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
          <FaUser className="text-lg" />
          <span>Login</span>
        </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
