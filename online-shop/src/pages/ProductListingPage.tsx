import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useParams } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const ProductListingPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 20;
  const { addToCart } = useCart();
  const { categoryName } = useParams<{ categoryName?: string }>(); // Get the category name from the URL

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   if (categoryName) {
  //     filterByCategory(categoryName); // Filter products by category if categoryName is in the URL
  //   }
  // }, [categoryName, products]);

  // const filterByCategory = (category: string | null) => {
  //   setSelectedCategory(category);
  //   setCurrentPage(1); // Reset to first page
  //   if (category === null) {
  //     setFilteredProducts(products);
  //   } else {
  //     setFilteredProducts(products.filter(product => product.category === category));
  //   }
  // };
  const filterByCategory = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
    if (category === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  }, [products]);

  useEffect(() => {
    if (categoryName) {
      filterByCategory(categoryName); // Filter products by category if categoryName is in the URL
    }
  }, [categoryName, products, filterByCategory]);

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
      <div className="mb-8 flex justify-center gap-2 ">
        <button
          className={`py-2 px-4 rounded ${selectedCategory === null ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}
          onClick={() => filterByCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded ${selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-secondary hover:text-white'}`}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className='flex flex-wrap gap-4'>
        {currentProducts.map((product) => (
          <div key={product.id} className="border border-secondary rounded-lg overflow-hidden shadow-lg bg-white p-4 w-72">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4"
              onError={() => handleImageError(product.id)}
            />
            <h2 className="text-xl font-bold text-secondary mb-2">{product.title}</h2>
            <p className="text-primary font-semibold mb-4">${product.price}</p>
            <div className="flex gap-2" >
              <button
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors duration-300"
                onClick={() => {
                  alert('Product is added to cart!');
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <Link to={`/details/${product.id}`}>
                <button className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300">
                  Show Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center gap-3">
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
