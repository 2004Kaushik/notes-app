import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { getTheme } from './lib/theme';
import { Toaster } from 'react-hot-toast';

// Initialize theme
document.documentElement.setAttribute('data-theme', getTheme());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 2000,
          style: {
            background: 'hsl(var(--b1))',
            color: 'hsl(var(--bc))',
          },
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>
);
