import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
      "/socket.io": {
        target: "http://localhost:5000",
        ws: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  define: {
    // Define global constants to replace at build time
    __API_URL__: JSON.stringify(process.env.NODE_ENV === 'production' 
      ? 'https://real-time-chat-application-chatterbox.onrender.com' 
      : '')
  }
});