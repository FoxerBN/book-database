// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginSuccess from "./components/auth/LoginSuccess";
import Profile from './pages/Profile'
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes wrapped with ThemeProvider */}
        <Route element={<ThemeProvider><Layout /></ThemeProvider>}>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login-success" element={<LoginSuccess />} />
          <Route path="profile" element={<ThemeProvider><Profile /></ThemeProvider>} />
        </Route>
        {/* Routes without ThemeProvider */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
