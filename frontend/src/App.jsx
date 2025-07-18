import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SettingsPages from "./pages/SettingsPages";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/AuthLayout";
import useAuthStore from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const { authUser, checkAuthUser, isCheckingAuth } = useAuthStore();
  console.log("Auth User in App:", authUser);

  useEffect(() => {
    checkAuthUser();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route element={!authUser ? <AuthLayout /> : <Navigate to="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/settings" element={<SettingsPages />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
