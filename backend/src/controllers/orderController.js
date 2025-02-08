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
