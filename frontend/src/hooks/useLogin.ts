import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Function to handle email/password login
  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/login",
        { username: email, password, rememberMe },
        { withCredentials: true }
      );

      console.log(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Function to handle Google login
  const loginWithGoogle = (rememberMe: boolean) => {
    window.location.href = `http://localhost:3001/auth/google?rememberMe=${rememberMe}`;
  };

  return { login, loginWithGoogle, error };
};

export default useLogin;
