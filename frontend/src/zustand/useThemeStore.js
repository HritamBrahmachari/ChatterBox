import { create } from "zustand";

const useThemeStore = create((set) => ({
  // Initialize dark mode based on localStorage or system preference
  isDarkMode: localStorage.getItem("theme") === "dark" || 
    (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches),
  
  // Toggle between dark and light modes
  toggleTheme: () => {
    set((state) => {
      const newIsDarkMode = !state.isDarkMode;
      
      // Update localStorage and document class
      if (newIsDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      
      return { isDarkMode: newIsDarkMode };
    });
  },
  
  // Initialize theme on app load
  initTheme: () => {
    const { isDarkMode } = useThemeStore.getState();
    
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
}));

export default useThemeStore;
