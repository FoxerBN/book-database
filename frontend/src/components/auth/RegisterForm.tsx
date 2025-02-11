// src/components/auth/RegisterForm.tsx
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (pwd: string): boolean => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(pwd);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long, with uppercase, lowercase, and a number.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/register', { name, email, password }, { withCredentials: true });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input type="email" className="w-full p-2 border border-gray-300 rounded mt-1" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Password</label>
        <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>

      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
