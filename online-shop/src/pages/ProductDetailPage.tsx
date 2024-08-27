import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://fakeapi.platzi.com/api/v1/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <div className="flex">
        <img src={product.image} alt={product.title} className="w-1/2 h-auto object-cover rounded-md shadow-md" />
        <div className="ml-8">
          <p className="text-xl text-gray-800 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;