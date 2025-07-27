import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

const toast = {
  error: (message) => console.error(message),
};

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
    <div className="min-h-screen  flex items-center justify-center sm:pt-[80px]">
      <div className="w-[90%] bg-white rounded-3xl ">
        <div className="flex flex-col lg:flex-row ">
          {/* Left Side - Login Form */}
          <div className="w-full lg:w-1/2 p-8 lg:px-12 flex flex-col justify-center">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="text-4xl mb-3">🔐</div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome Back!
              </h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            <div onSubmit={handleSubmit} className="space-y-2">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
                type="submit"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-300"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Right Side - Welcome Message */}
          <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white items-center justify-center rounded-3xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full"></div>
              <div className="absolute top-10 right-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-1/3 left-10 w-12 h-12 bg-white rounded-full"></div>
            </div>

            <div className="text-center z-10">
              <div className="text-6xl mb-6">👋</div>
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-xl opacity-90 leading-relaxed mb-6">
                Sign in to continue your journey with us
              </p>
              <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mb-8"></div>
              <div className="space-y-2 text-lg opacity-80">
                <p>✨ Access your conversations</p>
                <p>🚀 Connect with friends</p>
                <p>💬 Stay in touch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
