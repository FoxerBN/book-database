import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginForm from "../components/auth/LoginForm";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/auth/validate", { withCredentials: true });
        if (response.data.success) {
          navigate("/");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          console.log("User not authenticated (which is fine :) ).");
        } else {
          console.error("Unexpected error", error);
        }
      }
    };

    validateUser();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
      <LoginForm />
    </div>
  );
};

export default Login;
