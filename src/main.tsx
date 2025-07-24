import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { BeerProvider } from './context/BeerContext';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BeerProvider>
          <App />
        </BeerProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
