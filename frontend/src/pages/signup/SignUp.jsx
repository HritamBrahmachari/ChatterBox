import React, { useState } from "react";
import { Link } from "react-router-dom";

import useSignup from "../../hooks/useSignup";
import GenderCheckBox from "./GenderCheckBox";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto py-4">
      <div className="w-full max-w-md p-6 rounded-2xl backdrop-blur-md bg-gradient-to-bl from-blue-900/20 to-blue-600/20 border border-blue-300/30 shadow-xl">
        <div className="mb-4 text-center">
          <div className="inline-block p-2 mb-2 bg-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Join <span className="text-blue-300">ChatterBox</span> Today
          </h1>
          <p className="mt-1 text-blue-100 text-xs">Start connecting with people around the world</p>
        </div>        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-blue-100 font-medium text-sm pl-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 py-2 text-sm bg-blue-900/30 text-white placeholder-blue-300/60 rounded-xl border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </div>
          </div>          <div className="space-y-1">
            <label className="text-blue-100 font-medium text-sm pl-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full pl-10 py-2 text-sm bg-blue-900/30 text-white placeholder-blue-300/60 rounded-xl border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-blue-100 font-medium text-sm pl-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full pl-10 py-2 text-sm bg-blue-900/30 text-white placeholder-blue-300/60 rounded-xl border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-blue-100 font-medium text-sm pl-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-10 py-2 text-sm bg-blue-900/30 text-white placeholder-blue-300/60 rounded-xl border border-blue-400/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              />
            </div>
          </div>          <div className="space-y-1">
            <label className="text-blue-100 font-medium text-sm pl-1">
              Gender
            </label>
            <div className="bg-blue-900/30 p-1.5 rounded-xl border border-blue-400/30">
              <GenderCheckBox
                onCheckBoxChange={handleCheckboxChange}
                selectedGender={inputs.gender}
              />
            </div>
          </div>
          
          <div className="pt-1">
            <button
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform transition-transform duration-200 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-blue-100 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
