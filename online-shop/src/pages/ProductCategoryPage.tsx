import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  name: string;
  image: string;
}

const ProductCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesWithImages = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        // Map categories with their first product's image
        const categoryMap: Record<string, string> = {};
        products.forEach((product: any) => {
          if (!categoryMap[product.category]) {
            categoryMap[product.category] = product.image;
          }
        });

        const categories = Object.keys(categoryMap).map((category) => ({
          name: category,
          image: categoryMap[category],
        }));

        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories with images:', error);
      }
    };

    fetchCategoriesWithImages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            onClick={() => navigate(`/products/${category.name}`)} // Navigate to ProductListingPage with category
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-2xl font-bold text-white uppercase">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryPage;