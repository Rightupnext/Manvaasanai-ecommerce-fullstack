const mongoose = require("mongoose");
const Order = require("../models/orders");
const Product = require("../models/Product");

// Place Order API
exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentId, amount } = req.body;
    console.log("order creation", products, shippingAddress, paymentId, amount);
    const { fullName, street, city, state, phoneNumber, postalCode } =
      shippingAddress;
    if (
      !fullName ||
      !street ||
      !city ||
      !state ||
      !phoneNumber ||
      !postalCode
    ) {
      return res
        .status(400)
        .json({ message: "All shipping address fields are required." });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required." });
    }

    for (let i = 0; i < products.length; i++) {
      if (!products[i].product) {
        return res
          .status(400)
          .json({
            message: `Product at index ${i} is missing a 'product' field.`,
          });
      }
    }

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
      amount,
      paymentId,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database, populating the product details
    const orders = await Order.find().populate("products.product");

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders); // Return all orders
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Validate if the status is a valid status
    const validStatuses = ["Pending", "Packed", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Get the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order's status can be updated to the requested status
    const statusOrder = validStatuses.indexOf(order.status);
    const statusNew = validStatuses.indexOf(status);

    if (statusNew <= statusOrder) {
      return res
        .status(400)
        .json({ message: `Cannot move to ${status} from ${order.status}` });
    }

    // Update the status
    order.status = status;
    await order.save();

    res
      .status(200)
      .json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
