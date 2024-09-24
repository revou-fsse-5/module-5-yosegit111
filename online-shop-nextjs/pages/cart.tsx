import { useCart } from '../src/context/CartContext';

const CartPage: React.FC = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="mb-4">
            <img src={item.image} alt={item.title} className="w-20 h-20 inline-block mr-4" />
            <span>{item.title} - ${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
