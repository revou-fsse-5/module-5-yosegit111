import React from 'react';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-2">${price}</p>
      <button className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;