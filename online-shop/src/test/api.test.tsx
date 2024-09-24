export {}; // Ensure the file is treated as a module (ts requirement)
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe('Fake Store API Tests', () => {
  beforeEach(() => {
    fetch.resetMocks(); // Reset the mock before each test
  });

  it('should fetch users successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ id: 1, username: 'test' }])); // Mock the response

    const response = await fetch('https://fakestoreapi.com/users');
    expect(response.ok).toBe(true); // Check if the response is okay
    const data = await response.json();
    
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('id', 1);
    expect(data[0]).toHaveProperty('username', 'test');
  });

  it('should fetch a single user successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 1, username: 'test', email: 'test@gmail.com' }));

    const response = await fetch('https://fakestoreapi.com/users/1');
    expect(response.ok).toBe(true); // Check if the response is okay
    const data = await response.json();

    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('username', 'test');
    expect(data).toHaveProperty('email', 'test@gmail.com');
  });

  it('should fetch categories successfully', async () => {
    fetch.mockResponseOnce(JSON.stringify(['category1', 'category2']));

    const response = await fetch('https://fakestoreapi.com/products/categories');
    expect(response.ok).toBe(true); // Check if the response is okay
    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    data.forEach((category: string) => expect(typeof category).toBe('string'));
  });
});
