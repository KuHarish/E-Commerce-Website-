import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-xl dark:text-white">Product not found</div>;
  }

  return (
    <div>
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover object-center"
          />
        </div>
        
        <div className="flex flex-col justify-center">
          <div className="text-sm text-primary font-bold tracking-widest uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {product.name}
          </h1>
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
            <select 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-24"
            >
              {[...Array(Math.min(10, product.stock || 1)).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => addToCart(product._id, quantity)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30"
            >
              <ShoppingCart className="h-6 w-6" /> Add to Cart
            </button>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mt-4">
              <Check className="h-5 w-5" /> In Stock & Ready to Ship
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
