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
        <Link to="/" className="text-2xl font-bold text-tertiary">AnythingShop</Link>
        <nav className="flex space-x-8">  {/* Added space between links */}
          <Link to="/" className="text-secondary hover:text-tertiary">Home</Link>
          <Link to="/products" className="text-secondary hover:text-tertiary">Product Catalogue</Link>
          <Link to="/Categories" className="text-secondary hover:text-tertiary">Product Categories</Link>
          <Link to="/cart" className="text-secondary hover:text-tertiary">Cart</Link>
          <Link to="/login" className="text-secondary hover:text-tertiary mr-2">Register or Log In</Link>
        </nav>
      </div>
      {isLoggedIn && (
        <div className="text-center mt-2">
          <p>You are logged in, {user?.email}. If you wish to <Link to="/" onClick={handleLogout} className="text-blue-600 underline">log out here</Link>.</p>
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
