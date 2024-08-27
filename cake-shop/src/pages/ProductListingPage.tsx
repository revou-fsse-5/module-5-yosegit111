import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Removed the 'message' property

  useEffect(() => {
    // Mock data for the cake products
    const mockProducts: Product[] = [
      { id: 1, title: 'Chocolate Cake', price: 25.99, image: 'https://via.placeholder.com/150/0000FF/808080?Text=ChocolateCake' },
      { id: 2, title: 'Vanilla Cake', price: 20.49, image: 'https://via.placeholder.com/150/FFFF00/000000?Text=VanillaCake' },
      { id: 3, title: 'Strawberry Cake', price: 22.99, image: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=StrawberryCake' },
      { id: 4, title: 'Red Velvet Cake', price: 27.99, image: 'https://via.placeholder.com/150/FF00FF/000000?Text=RedVelvetCake' },
      { id: 5, title: 'Lemon Cake', price: 19.99, image: 'https://via.placeholder.com/150/FFFF00/000000?Text=LemonCake' },
      { id: 6, title: 'Carrot Cake', price: 23.49, image: 'https://via.placeholder.com/150/FFA500/000000?Text=CarrotCake' },
      { id: 7, title: 'Cheesecake', price: 24.99, image: 'https://via.placeholder.com/150/FFFFFF/000000?Text=Cheesecake' },
      { id: 8, title: 'Black Forest Cake', price: 28.99, image: 'https://via.placeholder.com/150/000000/FFFFFF?Text=BlackForestCake' },
      { id: 9, title: 'Pineapple Cake', price: 21.99, image: 'https://via.placeholder.com/150/FFFFE0/000000?Text=PineappleCake' },
      { id: 10, title: 'Fruit Cake', price: 29.99, image: 'https://via.placeholder.com/150/FF6347/000000?Text=FruitCake' },
    ];

    // Set the mock data to the state
    setProducts(mockProducts);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Our Cakes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;

