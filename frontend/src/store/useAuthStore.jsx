import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../constants/apiUrl";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuthUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      console.log("Auth user response: ", response.data);
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking auth user:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (userData) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, userData);
      set({ authUser: response.data });

      get().connectSocket();

      toast("User signed up successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      userData.fullName = "";
      userData.email = "";
      userData.password = "";
    } catch (error) {
      console.log("Axios error:", error);
      toast(error?.response?.data?.message || "Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },

  login: async (userData) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);
      set({ authUser: res.data.data });
      userData.email = "";
      userData.password = "";

      get().connectSocket();

      toast("User signed in successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.log("Axios Login error:", error);
      toast(error?.response?.data?.message || "Something went wrong", {
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
      await axiosInstance.post(`/auth/logout`);
      set({ authUser: null });
      get().disConnectSocket();
      toast("User logged out successfully", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast(error?.response?.data?.message || "Something went wrong", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`/auth/update-profile`, userData);
      set({ authUser: response.data });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  },
  deleteAccount: async () => {
    try {
      await axios.delete(`${BASE_URL}/auth/delete`);
      set({ authUser: null });
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) return;
    const socket = io(BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket : socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disConnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

}));

export default useAuthStore;
