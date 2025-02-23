import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "../hooks/useLogout"; 

const Navigation: React.FC = () => {
  const logout = useLogout();

  return (
    <nav className="p-3 w-full bg-gray-300">
      <div className="mx-auto flex justify-between items-center max-w-full">
        <Link
          to="/"
          className="text-xl -rotate-25 opacity-75 p-1 font-bold max-[480px]:hidden"
        >
          <FaBook />
        </Link>
        <div className="flex items-center gap-3">
          <Link to='profile'>
          <p className="text-xs hover:text-blue-700 hover:text-[0.80rem] transition-all cursor-pointer">
            {(localStorage.getItem("user") &&
              JSON.parse(localStorage.getItem("user") as string).username) ||
              "Guest"}
          </p>
          </Link>
          {!localStorage.getItem("user") ? (
            <Link to="/login" className="flex items-center space-x-2 hover:text-gray-300">
              <FaUser className="text-xs" />
              <span className="text-xs">Login</span>
            </Link>
          ) : (
            <IoLogOutOutline onClick={logout} className="cursor-pointer" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
