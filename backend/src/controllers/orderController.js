const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product = require('../models/Product');

// Place Order API
exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    // Validate shippingAddress fields
    const { fullName, street, city, state, phoneNumber, postalCode } = shippingAddress;
    if (!fullName || !street || !city || !state || !phoneNumber || !postalCode) {
      return res.status(400).json({ message: 'All shipping address fields are required.' });
    }

    let subTotal = 0;
    let totalPrice = 0;
    let tax = 0;

    // Calculate the subTotal, totalPrice, and tax
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      subTotal += product.price * item.quantity;
    }

    // You can calculate tax here, for example, 10% tax
    tax = subTotal * 0.10; // 10% tax
    totalPrice = subTotal + tax;

    const order = new Order({
      user: req.user.id,
      products,
      shippingAddress: {
        fullName,
        street,
        city,
        state,
        phoneNumber,
        postalCode,
      },
      totalPrice,
      subTotal,
      tax,
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database, populating the product details
    const orders = await Order.find().populate('products.product');

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders); // Return all orders
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id; // Get order id from the request params
    const { status } = req.body; // The new status from the request body

    // Validate if the status is a valid status
    const validStatuses = ['Pending', 'Packed', 'Shipped', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Get the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order's status can be updated to the requested status
    const statusOrder = validStatuses.indexOf(order.status);
    const statusNew = validStatuses.indexOf(status);

    if (statusNew <= statusOrder) {
      return res.status(400).json({ message: `Cannot move to ${status} from ${order.status}` });
    }

    // Update the status
    order.status = status;
    await order.save();

    res.status(200).json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
