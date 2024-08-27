import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../services/api';

const ProductCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        const data = await fetchProductsByCategory(categoryId);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products by category", error);
      }
    };
    getProductsByCategory();
  }, [categoryId]);

  return (
    <div>
      <h1>Category: {categoryId}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategory;