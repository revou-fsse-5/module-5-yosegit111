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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p>${product.price}</p>
            <Link href={`/products/${product.id}`}>
              <p>Show Details</p>
            </Link>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
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
