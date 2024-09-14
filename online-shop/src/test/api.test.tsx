export {}; 

describe('Fake Store API Tests', () => {
  // test 1
  it('should fetch users successfully', // test 1 title
    async () => {
    const response = await fetch('https://fakestoreapi.com/users');
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    
    expect(Array.isArray(data)).toBe(true);
  });

  it('should fetch a single user successfully', async () => {
    const userId = 1; 
    const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
  });

  it('should fetch categories successfully', async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    
    expect(response.status).toBe(200);
    
    const data = await response.json();
    
    expect(Array.isArray(data)).toBe(true);
    data.forEach((category: string) => expect(typeof category).toBe('string'));
  });
});