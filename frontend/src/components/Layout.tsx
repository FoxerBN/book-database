import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container">
        <Outlet />
      </main>
      
      <footer className="text-center bg-gray-300 p-4">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
