import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-300/30 shadow-xl">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 mb-4 bg-blue-500 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-0.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back to <span className="text-blue-300">ChatterBox</span>
          </h1>
          <p className="mt-2 text-blue-100 text-sm">Connect with friends in just a moment</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-blue-100 font-medium pl-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full pl-10 py-3 bg-blue-900/30 text-white placeholder-blue-300/60 rounded-xl border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-blue-100 font-medium pl-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 py-3 bg-blue-900/30 text-white placeholder-blue-300/60 rounded-xl border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="pt-2">
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform transition-transform duration-200 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Logging In...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-blue-100">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
