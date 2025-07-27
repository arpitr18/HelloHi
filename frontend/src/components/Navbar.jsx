import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// Mock implementations for demo purposes
const Link = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

import useAuthStore from "../store/useAuthStore";



const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                {/* <MessageSquare className="w-5 h-5 text-white" /> */}

                <img
                  src="/logo.jpg" 
                  alt="Logo"
                  className="w-9 h-9 object-cover rounded-full"
                  />

              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                HelloHi<span className="text-2xl">👋</span>
              </h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {/* Settings Button */}
            <Link
              to="/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 group"
            >
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline font-medium">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Profile Button */}
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Profile</span>
                </Link>

                {/* Logout Button */}
                <button 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;