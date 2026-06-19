const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user._id }).populate('productId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cartItem = await Cart.findOne({ userId: req.user._id, productId });
    
    if (cartItem) {
      cartItem.quantity += Number(quantity);
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        userId: req.user._id,
        productId,
        quantity,
      });
    }
    
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ _id: req.params.id, userId: req.user._id });
    
    if (cartItem) {
      await cartItem.deleteOne();
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
