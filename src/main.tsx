import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { measurePageLoad, preloadCriticalResources } from './utils/seo'

// Preload critical resources
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Measure page load performance
document.addEventListener('DOMContentLoaded', measurePageLoad);
