import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import RememberCheckbox from "../UI/RememberCheckbox";
import { FaGoogle } from "react-icons/fa6";
const LoginForm: React.FC = () => {
  const { login, loginWithGoogle, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, rememberMe);
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
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => loginWithGoogle(rememberMe)}
          className="flex items-center justify-center cursor-pointer bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition"
        >
          <FaGoogle className="text-white text-2xl" />
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
