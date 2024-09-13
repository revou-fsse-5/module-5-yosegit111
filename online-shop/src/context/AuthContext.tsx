import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  street: string;
  country: string;
  city: string;
  phone: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // Fetch users from API
      const response = await fetch('https://fakestoreapi.com/users');
      const users: User[] = await response.json();

      // Check local storage for recently registered users
      const localUser = localStorage.getItem(email);
      const registeredUser = localUser ? JSON.parse(localUser) : users.find((u) => u.email === email);

      if (!registeredUser) {
        throw new Error('User not found');
      }

      // Validate the password
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error('Password must contain at least 5 characters, one letter, one number, and one special character');
      }

      if (registeredUser.password === password) {
        setUser({ email });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Failed to log in: ' + error.message);
      } else {
        throw new Error('Failed to log in: An unknown error occurred');
      }
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const register = (newUser: User) => {
  // Validate the password before saving the user
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
  if (!passwordRegex.test(newUser.password)) {
    alert('Password must contain at least 5 characters, one letter, one number, and one special character');
    return;
  }

  if (!localStorage.getItem(newUser.email)) {
    localStorage.setItem(newUser.email, JSON.stringify(newUser));
    alert('Registration successful!');
  } else {
    alert('Email already registered!');
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
