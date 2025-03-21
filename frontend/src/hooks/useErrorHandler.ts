// src/hooks/useErrorHandler.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function useErrorHandler(defaultMessage: string = "Something went wrong") {
  const [globalError, setError] = useState<string | null>(null);

  // Clears error after 3 seconds
  useEffect(() => {
    if (globalError) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [globalError]);

  // Method to handle (and parse) errors
  const handleError = (err: unknown) => {
    let message = defaultMessage;
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<any>;
      if (axiosError.response?.data?.error) {
        message = axiosError.response.data.error;
      } else if (axiosError.response?.data?.message) {
        message = axiosError.response.data.message;
      }
    }
    setError(message);
  };

  return {
    globalError,
    handleError,
  };
}

export default useErrorHandler;
