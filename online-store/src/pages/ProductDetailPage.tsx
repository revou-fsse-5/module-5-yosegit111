import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Details for product with ID: {id}</p>
    </div>
  );
};

export default ProductDetailPage;