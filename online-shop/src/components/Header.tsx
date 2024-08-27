import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-secondary">CakeShop</Link>
        <nav className="flex space-x-8">  {/* Added space between links */}
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/products" className="hover:text-primary">Product Catalogue</Link>
          <Link to="/cart" className="hover:text-primary">Cart</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
