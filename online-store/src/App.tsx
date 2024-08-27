import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './components/ProductList';
import ProductCategory from './pages/ProductCategory';
import ProductDetail from './components/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListing from './pages/ProductListing';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Product List</a></li>
              <li><a href="/category">Product Category</a></li>
              <li><a href="/product/:id">Product Detail</a></li>
              <li><a href="/cart">Shopping Cart</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/category" element={<ProductCategory />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;