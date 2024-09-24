import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Welcome to My Online Shop</h1>
      <p className="text-center mb-4">This is the homepage. Explore our various products by visiting the product catalogue.</p>
      
      {/* Banner Image */}
      <div className="flex justify-center">
        <img 
          src="https://lobangsiah.sg/wp-content/uploads/2023/03/lifestyle-store-1024x651.webp" 
          alt="Online Shop Banner" 
          className="w-full max-w-4xl rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

export default HomePage;