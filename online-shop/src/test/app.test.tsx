import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText("Welcome to My Online Shop"); //check if the words "Welcome..." is detected in the app. bisa cek lebih detail i.e. apakah ada opsi "Log Out", apakah ada navbar, apakah ada button, etc
  expect(welcomeElement).toBeInTheDocument();
});