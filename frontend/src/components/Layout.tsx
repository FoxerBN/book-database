import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Layout: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      className="min-h-screen max-w-screen flex flex-col"
    >
      <Navigation />
      
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      
      <footer
        style={{ backgroundColor: "var(--footer-bg-color)", color: "var(--text-color)" }}
        className="text-center p-4"
      >
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
