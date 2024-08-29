import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('You are logged out. Log in to check out.');
    navigate('/');
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-secondary">CakeShop</Link>
        <nav className="flex">
          <Link 
            to="/" 
            className="hover:text-primary" 
            style={{ marginRight: '1rem' }} // Adds padding between links
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="hover:text-primary" 
            style={{ marginRight: '1rem' }} // Adds padding between links
          >
            Product Catalogue
          </Link>
          <Link 
            to="/cart" 
            className="hover:text-primary" 
            style={{ marginRight: '1rem' }} // Adds padding between links
          >
            Cart
          </Link>
        </nav>
      </div>
      {isLoggedIn && (
        <div className="text-center mt-2">
          <p>You are logged in, {user?.email}. If you wish to log out, <button onClick={handleLogout} className="text-blue-600 underline">log out here</button></p>
        </div>
      )}
      {!isLoggedIn && (
        <div className="text-center mt-2">
          <p>You are logged out. <Link to="/login" className="text-blue-600 underline">Log in to check out.</Link></p>
        </div>
      )}
    </header>
  );
}

export default Header;

