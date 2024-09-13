import { register } from '../context/AuthContext';

interface User {
    username: string;
    email: string;
    password: string;
    street: string;
    country: string;
    city: string;
    phone: string;
  }

  describe('register function', () => {
    // Mock localStorage before each test
    beforeEach(() => {
      const localStorageMock = (function() {
        let store: { [key: string]: string } = {};
  
        return {
          getItem(key: string) {
            return store[key] || null;
          },
          setItem(key: string, value: string) {
            store[key] = value;
          },
          clear() {
            store = {};
          },
          removeItem(key: string) {
            delete store[key];
          },
        };
      })();
  
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
        writable: true,
      });
  
      localStorage.clear();
    });

  // 1st test: check something that works, and all its cases
  it('should register a new user successfully', () => {
    const newUser: User = { email: 'test@gmail.com', username: 'test', password: 'Password1!', street: '', city: '', country: '', phone: '' };

    register(newUser);

    // Verify that user is stored in localStorage
    const storedUser = localStorage.getItem(newUser.email);
    expect(storedUser).not.toBeNull();
    expect(JSON.parse(storedUser!)).toEqual(newUser);
  });

  // next tests: check something that shouldn't work (weak password, email taken, etc)
  it('should not register a user with an invalid password', () => {
    const invalidUser: User = { email: 'test', username: 'test', password: 'P', street: '', city: '', country: '', phone: '' };

    register(invalidUser);

    // Verify that user is not stored in localStorage
    const storedUser = localStorage.getItem(invalidUser.email);
    expect(storedUser).toBeNull();
  });

  it('should not register a user with an already registered email', () => {
    const existingUser: User = { email: 'test3@gmail.com', username: 'test', password: 'Password1!', street: '', city: '', country: '', phone: '' };
    const newUser: User = { email: 'test3@gmail.com', username: 'test', password: 'Password1!', street: '', city: '', country: '', phone: '' };

    // Register the first user
    register(existingUser);

    // Attempt to register the second user with the same email
    register(newUser);

    // Verify that the first user is still stored in localStorage
    const storedUser = localStorage.getItem(existingUser.email);
    expect(storedUser).not.toBeNull();
    expect(JSON.parse(storedUser!)).toEqual(existingUser);
  });

  // Clear localStorage once after all tests
  afterAll(() => {
  localStorage.clear();
  });
});