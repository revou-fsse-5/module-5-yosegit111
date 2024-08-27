import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, getTotalPrice } = useCart();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.title} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;

