import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary to-blue-600 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-20 md:px-16 md:py-32 flex flex-col items-start justify-center text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold mb-4">
            New Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight max-w-2xl">
            Upgrade Your Style.<br/> Simplify Your Life.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl text-blue-100">
            Discover our curated collection of premium products. Fast shipping, easy returns, and secure checkout.
          </p>
          <Link to="#products" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            Shop Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-primary">
            <Zap className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Fast Delivery</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get your items in 2-3 days</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Secure Payments</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">100% safe & encrypted</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Easy Returns</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">30-day return policy</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Products</h2>
            <p className="text-gray-500 dark:text-gray-400">Handpicked items for you</p>
          </div>
          <Link to="/products" className="text-primary font-medium hover:underline hidden sm:block">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
