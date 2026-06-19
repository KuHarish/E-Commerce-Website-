import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
      <Link to={`/product/${product._id}`}>
        <div className="h-64 overflow-hidden bg-gray-100 dark:bg-gray-900">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-extrabold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addToCart(product._id, 1)}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors focus:outline-none"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
