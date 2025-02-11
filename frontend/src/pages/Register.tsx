import RegisterForm from '../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
      <RegisterForm />
    </div>
  );
};

export default Register;
