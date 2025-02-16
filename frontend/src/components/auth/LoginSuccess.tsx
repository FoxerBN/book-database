// src/components/LoginSuccess.tsx
import { useEffect } from "react";
import useValidateAuth from "../../hooks/useValidateAuth";

const LoginSuccess = () => {
    const { validateAuth } = useValidateAuth();

    useEffect(() => {
      validateAuth();
    }, [validateAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loging in, please wait...</p>
    </div>
  );
};

export default LoginSuccess;
