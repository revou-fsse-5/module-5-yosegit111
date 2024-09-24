import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCart } from '../src/context/CartContext'; // Import the Cart Context

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart(); // Destructure addToCart from Cart Context

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <p className="text-xl font-semibold mb-4">${product.price}</p>
      <p className="mb-4">{product.description}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailPage;
