import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-gray-800 p-4 text-white">
    <nav>
      <ul className="flex justify-between">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/cart">Cart</Link></li>
        <li><Link href="/login">Login</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
