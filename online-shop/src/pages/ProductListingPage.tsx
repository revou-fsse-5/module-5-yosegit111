import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: Category;
}

const ProductListingPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 20;
  const { addToCart } = useCart();

  // Words to filter out from product titles
  const excludedWords = ["My", "Product", "Peras", "Software", "sql"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await response.json();
        // Filter categories to show only the required ones
        const filteredCategories = data.filter((category: Category) =>
          ["Clothes", "Electronics", "Shoes", "Miscellaneous"].includes(category.name)
        );
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data = await response.json();
        // Filter out products based on title
        const filteredProducts = data.filter((product: Product) =>
          !excludedWords.some(word => product.title.includes(word))
        );
        // Further filter products based on required categories
        const categoryFilteredProducts = filteredProducts.filter((product: Product) =>
          ["Clothes", "Electronics", "Shoes", "Miscellaneous"].includes(product.category.name)
        );
        setProducts(categoryFilteredProducts);
        setFilteredProducts(categoryFilteredProducts); // Initially show all filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const filterByCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page
    if (categoryId === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category.id === categoryId));
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleImageError = (productId: number) => {
    setFilteredProducts(filteredProducts.filter(product => product.id !== productId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Our Products</h1>

      {/* Category Buttons */}
      <div className="mb-8 flex justify-center space-x-4">
        <button
          className={`py-2 px-4 rounded ${selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}
          onClick={() => filterByCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`py-2 px-4 rounded ${selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}
            onClick={() => filterByCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="border border-secondary rounded-lg overflow-hidden shadow-lg bg-white p-4">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
              style={{ width: '5cm', height: '5cm' }}
              onError={() => handleImageError(product.id)}
            />
            <h2 className="text-xl font-bold text-secondary mb-2">{product.title}</h2>
            <p className="text-primary font-semibold mb-4">${product.price}</p>
            <button
              className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors duration-300"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`py-2 px-4 rounded ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListingPage;
