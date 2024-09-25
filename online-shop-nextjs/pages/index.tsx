import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const HomePage: React.FC = () => (
  <>
    <Header />
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Welcome to My Online Shop</h1>
      <p className="text-center mb-4">Explore our various products.</p>
    </main>
    <Footer />
  </>
);

export default HomePage;