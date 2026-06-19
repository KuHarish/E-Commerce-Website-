const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getOrders);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

module.exports = router;
