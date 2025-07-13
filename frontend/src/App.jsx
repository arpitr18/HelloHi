import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SettingsPages from "./pages/SettingsPages";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./components/AuthLayout"; // Import the layout

const App = () => {
  const authUser = true; // dummy auth

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Auth Routes with animated layout */}
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
    </>
  );
};

export default App;
