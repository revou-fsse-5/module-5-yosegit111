import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart(); // Destructure addToCart from useCart
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      // If id is undefined, navigate back to the product listing page
      navigate('/products');
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/'); // Navigate back to home page if there's an error
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-cover mb-4 md:mb-0"
        />
        <div className="md:ml-4">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors duration-300"
            onClick={() => {
              alert('Product is added to cart!');
              addToCart(product);
            }}
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate('/products')}
            className="ml-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;