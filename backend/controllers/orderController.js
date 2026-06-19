const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress, totalAmount } = req.body;

    if (products && products.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      const order = new Order({
        userId: req.user._id,
        products,
        shippingAddress,
        totalAmount,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    // If admin, get all orders. If user, get only their orders.
    if (req.user.role === 'admin') {
      const orders = await Order.find({}).populate('userId', 'name email');
      res.json(orders);
    } else {
      const orders = await Order.find({ userId: req.user._id });
      res.json(orders);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.status || order.orderStatus;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
