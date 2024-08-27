const API_BASE_URL = 'https://api.example.com'; // Replace with the actual API base URL

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductsByCategory = async (categoryId: string) => {
  const response = await fetch(`${API_BASE_URL}/products?category=${categoryId}`);
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return response.json();
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product details');
  return response.json();
};