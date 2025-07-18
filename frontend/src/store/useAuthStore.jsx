import axios from "axios";
import { create } from "zustand";
import BASE_URL from "../constants/apiUrl";
import toast from "react-hot-toast";


const savedUser = JSON.parse(localStorage.getItem("authUser"));

const useAuthStore = create((set) => ({
  authUser: savedUser || null,
  isCheckingAuth: true,

  checkAuthUser: async () => {
    const localUser = JSON.parse(localStorage.getItem("authUser"));

    if (localUser) {
      set({ authUser: localUser, isCheckingAuth: false });
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/auth/check`, {
        withCredentials: true,
      });

      const user = response.data?.data;
      if (user) {
        set({ authUser: user });
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.error("Auth check failed:", error?.response?.data);
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
        withCredentials: true,
      });

      const user = response.data?.data;
      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));

      toast("User signed in successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      toast(error?.response?.data?.Message || "Attempt to Sign In Failed", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },

  logout: async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      set({ authUser: null });
      localStorage.removeItem("authUser");

      toast("User logged out successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Logout error:", error?.response?.data);
      toast(error?.response?.data?.Message || "Failed to Logout", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, userData, {
        withCredentials: true,
      });

      const user = response.data?.data;
      set({ authUser: user });
      localStorage.setItem("authUser", JSON.stringify(user));

      toast("User signed up successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Signup error:", error?.response?.data);
      toast(error?.response?.data?.Message|| "Signed Up Failed", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },
}));

export default useAuthStore;
