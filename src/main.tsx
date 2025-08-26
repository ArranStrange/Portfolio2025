import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { measurePageLoad, preloadCriticalResources } from "./utils/seo";

// Preload critical resources before app initialization
preloadCriticalResources();

// Initialize app after ensuring resources are preloaded
setTimeout(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}, 200); // Increased delay to ensure resources are preloaded

// Measure page load performance
document.addEventListener("DOMContentLoaded", measurePageLoad);
