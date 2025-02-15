import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface PasswordValidation  {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
}
const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [passwordValidations, setPasswordValidations] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const validatePassword = (pwd: string) => {
    const validations = {
      length: pwd.length >= 6,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
    };
    setPasswordValidations(validations);
    return Object.values(validations).every(Boolean);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long, with uppercase, lowercase, and a number.');
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/user/register', { name, email, password }, { withCredentials: true });
      console.log(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      setTimeout(() => setError(null), 3000);
    }
  };
  
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input type="text" className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input type="email" className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            required
          />
          <div className="mt-2 text-sm text-gray-400">
            <p className={passwordValidations.length ? 'text-blue-300' : 'text-red-500 opacity-85'}>{passwordValidations.length ? '✓':'✕'} At least 6 characters</p>
            <p className={passwordValidations.uppercase ? 'text-blue-300' : 'text-red-500 opacity-85'}>{passwordValidations.uppercase ? '✓':'✕'} One uppercase letter</p>
            <p className={passwordValidations.lowercase ? 'text-blue-300' : 'text-red-500 opacity-85'}>{passwordValidations.lowercase ? '✓':'✕'} One lowercase letter</p>
            <p className={passwordValidations.number ? 'text-blue-300' : 'text-red-500 opacity-85'}>{passwordValidations.number ? '✓':'✕'} One number</p>
          </div>
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80">
          Register
        </button>
        <p className="mt-4 text-center text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
