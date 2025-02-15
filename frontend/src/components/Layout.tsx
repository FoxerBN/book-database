import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      {/* ✅ Navigation mimo containeru, aby bolo na celú šírku */}
      <Navigation />
      
      <main className="flex-grow container  mx-auto p-4">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
