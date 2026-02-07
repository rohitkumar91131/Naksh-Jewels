import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider> 
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
                <App />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
    </ToastProvider>
  </StrictMode>,
);