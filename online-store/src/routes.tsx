import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductListing from './pages/ProductListing';
import ProductCategory from './pages/ProductCategory';
import ProductDetailPage from './pages/ProductDetailPage';
import ShoppingCart from './pages/ShoppingCart';

const RoutesConfig: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/category/:categoryId" element={<ProductCategory />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<ShoppingCart />} />
    </Routes>
  </Router>
);

export default RoutesConfig;