import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Please login to view your cart</h2>
        <button onClick={() => navigate('/login')} className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600">
          Login
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors inline-block">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            item.productId && (
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <img 
                  src={item.productId.image} 
                  alt={item.productId.name} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="grow text-center sm:text-left">
                  <Link to={`/product/${item.productId._id}`} className="font-bold text-lg text-gray-900 dark:text-white hover:text-primary line-clamp-1">
                    {item.productId.name}
                  </Link>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Quantity: {item.quantity}</div>
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  ${(item.productId.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-fit">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between font-bold text-xl text-gray-900 dark:text-white">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <Link 
            to="/checkout" 
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            Proceed to Checkout <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
