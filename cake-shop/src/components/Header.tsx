import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="flex justify-between">
        <div className="text-lg font-bold">CakeShop</div>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/products" className="mr-4">Product Catalogue</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
