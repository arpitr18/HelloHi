import { useState } from "react";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const SignUpPage = () => {
  const { signup } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Name is required");
      return false;
    }

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

    const isValid = validateForm();
    if (!isValid) {
      console.log("❌ Form validation failed. Not submitting.");
      return;
    }

    signup(formData);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      {/* Left Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="form-control">
            <label>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>

      {/* Right Message */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white items-center justify-center p-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Join Us 🎉</h2>
          <p className="opacity-80">Create your free account today</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
