import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    // if (formData.password.length < 6) {
    //   toast.error("password less than 6 characters!");
    //   return false;
    // }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ stop here if validation fails
    const isValid = validateForm();
    if (!isValid) {
      console.log("❌ Form validation failed. Not submitting.");
      return;
    }

    login(formData);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* Left Message */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-600 to-indigo-500 text-white items-center justify-center p-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
          <p className="opacity-80">Login to continue</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="form-control">
            <label>Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 pr-10"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
