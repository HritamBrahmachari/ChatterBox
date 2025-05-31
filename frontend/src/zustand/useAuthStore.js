import { create } from "zustand";

const useAuthStore = create((set) => ({
  // Initial state - load from localStorage or set to null
  authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
  
  // Set the authenticated user and update localStorage
  setAuthUser: (user) => {
    if (user) {
      localStorage.setItem("chat-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("chat-user");
    }
    set({ authUser: user });
  },
}));

export default useAuthStore;
