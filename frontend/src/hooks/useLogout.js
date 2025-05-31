import { useState } from "react";
import useAuthStore from "../zustand/useAuthStore";
import toast from "react-hot-toast";
import { makeRequest } from "../utils/api";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const logout = async () => {
    setLoading(true);

    try {
      const res = await makeRequest("/auth/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
