import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../src/context/CartContext'; // Import Cart Context

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Destructure addToCart

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{product.title}</h2>
            <p className="text-primary font-semibold mb-4">${product.price}</p>
            <div className="flex justify-between">
              {/* Add the "Show Details" button */}
              <Link href={`/products/${product.id}`} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300">
                Show Details
              </Link>
              {/* Add the "Add to Cart" button */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;

