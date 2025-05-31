import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";

import "./App.css";
import useAuthStore from "./zustand/useAuthStore";
import useSocketStore from "./zustand/useSocketStore";

function App() {
  const authUser = useAuthStore((state) => state.authUser);
  const initSocket = useSocketStore((state) => state.initSocket);
  const disconnectSocket = useSocketStore((state) => state.disconnectSocket);
  
  // Initialize socket when user is authenticated
  useEffect(() => {
    if (authUser?._id) {
      // Connect to socket when user logs in
      initSocket(authUser._id);
    } else {
      // Disconnect socket when user logs out
      disconnectSocket();
    }
  }, [authUser?._id, initSocket, disconnectSocket]);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
