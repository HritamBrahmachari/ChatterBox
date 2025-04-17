import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { makeRequest } from "../utils/api";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputError(username, password);
    if (!success) {
      return;
    }
    setLoading(true);

    try {
      const res = await makeRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
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
