const Order = require('../models/orders');
const Product = require('../models/Product');

exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user.id,
      products,
      shippingAddress,
      totalPrice,
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.trackOrder = async (req, res) => {
  try {
    const { id } = req.params; // Order ID
    const order = await Order.findById(id).populate('products.product');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
