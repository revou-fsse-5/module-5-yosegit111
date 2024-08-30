
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      clearCart(); // Clear the cart
      alert('Checkout is successful!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="border p-2">
                    <img
                      src={item.images[0]} // Use the first image from the array
                      alt={item.title}
                    />
                  </td>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">${item.price.toFixed(2)}</td>
                  <td className="border p-2">
                    <button
                      className="bg-red1 text-white px-2 py-1 rounded hover:bg-red2"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="bg-green1 text-white px-2 py-1 rounded hover:bg-green2"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="border p-2">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="border p-2">
                    <button
                      className="bg-red1 text-white px-2 py-1 rounded hover:bg-red2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-lg font-semibold">
            Total Price: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </div>
          <button
            className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-tertiary"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;