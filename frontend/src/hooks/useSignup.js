import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { makeRequest } from "../utils/api";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) {
      return;
    }

    setLoading(true);

    try {
      const res = await makeRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));

      setAuthUser(data);

      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

//error handler
function handleInputError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password dont match");
    return false;
  }

  if (password != null && password.length < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }

  return true;
}
