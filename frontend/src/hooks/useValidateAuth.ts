import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios, { AxiosResponse } from "axios";

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    username: string;
  };
  message?: string;
}

const useValidateAuth = () => {
  const navigate = useNavigate();

  const validateAuth = useCallback(async (): Promise<void> => {
    try {
      const response: AxiosResponse<AuthResponse> = await axios.get("http://localhost:3001/user/auth/validate", {
        withCredentials: true,
      });
      if (response.data.success) {
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Validation error:", error);
      navigate("/login");
    }
  }, [navigate]);

  return { validateAuth };
};

export default useValidateAuth;