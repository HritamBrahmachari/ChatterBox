// Import necessary modules and configuration
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_API_BASE_URL": JSON.stringify(process.env.VITE_API_BASE_URL),
    "import.meta.env.VITE_NODE_ENV": JSON.stringify(process.env.VITE_NODE_ENV),
    // Define global constants to replace at build time
    __API_URL__: JSON.stringify(process.env.NODE_ENV === 'production' 
      ? 'https://real-time-chat-application-chatterbox.onrender.com' 
      : '')
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/socket.io": {
        target: process.env.VITE_API_BASE_URL || "http://localhost:5000",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
      "/uploads": { // Add proxy for uploads
        target: process.env.VITE_API_BASE_URL || "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
