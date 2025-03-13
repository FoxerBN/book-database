import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy imports
const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProfileLayout = lazy(() => import("./components/ProfileLayout"));
const Recommended = lazy(() => import("./pages/profile/Recommended"));
const Favourites = lazy(() => import("./pages/profile/Favourites"));
const Friends = lazy(() => import("./pages/profile/Friends"));
const Support = lazy(() => import("./pages/profile/Support"));
const ProfilePhoto = lazy(() => import("./pages/profile/ProfilePhoto"));
const OneBook = lazy(() => import("./pages/OneBook"));
const LoginSuccess = lazy(() => import("./components/auth/LoginSuccess"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login-success" element={<LoginSuccess />} />
            <Route path="profile/*" element={<ProfileLayout />}>
              <Route index element={<Recommended />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="friends" element={<Friends />} />
              <Route path="support" element={<Support />} />
              <Route path="profilephoto" element={<ProfilePhoto />} />
            </Route>
            <Route path="onebook/:id" element={<OneBook />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
