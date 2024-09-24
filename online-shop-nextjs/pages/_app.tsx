import '../styles/globals.css'; 
import type { AppProps } from 'next/app';
import { CartProvider } from '../src/context/CartContext'; 
import { AuthProvider } from '../src/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
