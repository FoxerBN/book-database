// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoginSuccess from "./components/auth/LoginSuccess";
import ProfileLayout from "./components/ProfileLayout";
import Recommended from "./pages/profile/Recommended";
import Favourites from "./pages/profile/Favourites";
import Friends from "./pages/profile/Friends";
import Support from "./pages/profile/Support";
import { ThemeProvider } from "./context/ThemeContext";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ThemeProvider><Layout /></ThemeProvider>}>
        
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="login-success" element={<LoginSuccess />} />
          
          <Route path="profile/*" element={<ThemeProvider><ProfileLayout /></ThemeProvider>}>
            <Route index element={<Recommended />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="friends" element={<Friends />} />
            <Route path="support" element={<Support />} />
          </Route>

        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
