import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/cart');
      setCartItems(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    try {
      await axios.post('/api/cart/add', { productId, quantity });
      toast.success('Item added to cart');
      fetchCart();
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error(error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart/remove/${cartItemId}`);
      toast.info('Item removed from cart');
      fetchCart();
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // populate product data is available
      const price = item.productId?.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, loading, addToCart, removeFromCart, getCartTotal, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
