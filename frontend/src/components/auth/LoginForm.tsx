import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/login',
        { email, password },
        { withCredentials: true }
      );
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80">
          Login
        </button>
        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
