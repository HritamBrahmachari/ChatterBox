import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const login = async (username, password) => {
    const success = handleInputError(username, password);
    if (!success) {
      return;
    }
    setLoading(true);

    try {
      // Simple, direct API call for login
      const isProduction = window.location.hostname !== 'localhost';
      const apiUrl = isProduction
        ? 'https://real-time-chat-application-chatterbox.onrender.com/api/auth/login'
        : '/api/auth/login';

      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputError(username, password) {
  if (!username || !password) {
    toast.error("Please fill your username and password");
    return false;
  }
  return true;
}
