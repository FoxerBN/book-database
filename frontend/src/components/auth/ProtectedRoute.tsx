import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
}

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/protected", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setAuth({ loading: false, isAuthenticated: true });
        }
      } catch (error: any) {
        setAuth({ loading: false, isAuthenticated: false });
      }
    };

    checkAuth();
  }, []);

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
