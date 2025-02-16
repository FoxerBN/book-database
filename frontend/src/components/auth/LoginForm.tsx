import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RememberCheckbox from "../UI/RememberCheckbox";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleGoogleLogin = () => {
    window.location.href = `http://localhost:3001/auth/google?rememberMe=${rememberMe}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="text"
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center mb-6">
          <RememberCheckbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            id="rememberMeToggle"
          />
          <label
            htmlFor="rememberMeToggle"
            className="ml-2 text-sm text-gray-300 cursor-pointer"
          >
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-bold"
        >
          Login with Google
        </button>
      </div>
      <p className="mt-4 text-center text-gray-300">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
