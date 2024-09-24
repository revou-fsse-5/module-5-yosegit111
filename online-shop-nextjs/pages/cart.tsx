import { useCart } from '../../context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 mb-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>${item.price}</p>
              <div className="flex items-center">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <p className="mx-4">{item.quantity}</p>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
