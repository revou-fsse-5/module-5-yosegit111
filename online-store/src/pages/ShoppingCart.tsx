import React from 'react';

const ShoppingCart: React.FC = () => {
  // Mock cart data
  const cartItems = [
    { id: 1, name: 'Pizza', quantity: 2, price: 10 },
    { id: 2, name: 'Burger', quantity: 1, price: 5 },
  ];

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
      <button>Checkout</button>
    </div>
  );
};

export default ShoppingCart;