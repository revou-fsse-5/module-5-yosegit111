import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  email: string;
  password: string;
  address: string;
  country: string;
  city: string;
  birthDate: string;
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
    const registeredUser = JSON.parse(localStorage.getItem(email) || 'null');
  
    if (!registeredUser) {
      throw new Error('User not found');
    }
  
    if (registeredUser.password === password) {
      setUser({ email });
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (newUser: User) => {
    if (!localStorage.getItem(newUser.email)) {
      localStorage.setItem(newUser.email, JSON.stringify(newUser));
      alert('Registration successful!');
    } else {
      alert('Email already registered!');
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
