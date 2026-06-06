import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import './styles/global.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/form.css';
import './styles/list.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
