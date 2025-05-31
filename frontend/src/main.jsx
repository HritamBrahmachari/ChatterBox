import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import bgImage from "./assets/bg.jpg"; // Import the background image
import { BrowserRouter } from "react-router-dom";
import useThemeStore from "./zustand/useThemeStore.js";

// Apply background image to the body
document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bgImage})`;

// Initialize theme
useThemeStore.getState().initTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
