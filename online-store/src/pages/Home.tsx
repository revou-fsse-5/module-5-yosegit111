import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p><Link to="/products">Browse our products</Link></p>
    </div>
  );
};

export default Home;