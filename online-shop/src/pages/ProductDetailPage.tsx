// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
  description: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-cover mb-4 md:mb-0"
          style={{ width: '15cm', height: '15cm' }}
        />
        <div className="md:ml-4">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors duration-300"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <Link to="/products">
            <button className="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
