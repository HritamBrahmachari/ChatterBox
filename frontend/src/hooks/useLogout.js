import { useState } from "react";
import useAuthStore from "../zustand/useAuthStore";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const logout = async () => {
    setLoading(true);

    try {
      // Simple logout - just clear local state
      // The JWT cookie will expire naturally or be cleared by the browser
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      
      // Optional: Make a simple request to clear the cookie on the server
      // But don't block the logout process if it fails
      try {
        const isProduction = window.location.hostname !== 'localhost';
        const apiUrl = isProduction
          ? 'https://real-time-chat-application-chatterbox.onrender.com/api/auth/logout'
          : '/api/auth/logout';
          
        fetch(apiUrl, {
          method: "POST",
          credentials: 'include',
        }).catch(() => {
          // Silently ignore errors - logout should still work
        });
      } catch {
        // Silently ignore any errors with the server request
      }
      
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
