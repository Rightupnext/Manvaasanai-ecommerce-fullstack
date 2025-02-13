const mongoose = require("mongoose");
const Order = require("../models/orders");
const Product = require("../models/Product");

// Place Order API
exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentId, amount } = req.body;
    const { fullName, street, city, state, phoneNumber, postalCode } = shippingAddress;
    // Validate shipping address
    if (
      !fullName ||
      !street ||
      !city ||
      !state ||
      !phoneNumber ||
      !postalCode
    ) {
      return res.status(400).json({ message: "All shipping address fields are required." });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required." });
    }

    // Validate each product
    for (let i = 0; i < products.length; i++) {
      if (!products[i].product) {
        return res
          .status(400)
          .json({
            message: `Product at index ${i} is missing a 'product' field.`,
          });
      }
    }

    // Create the order
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
      status: "Pending",  // Initial status set to Pending
      statusHistory: [
        {
          status: "Pending",  // Initial status
          updatedAt: new Date(),  // Timestamp when the order is created
        },
      ],
    });

    // Save the order to the database
    await order.save();

    // Respond with success
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

    const validStatuses = ["Pending", "Packed", "Shipped", "Delivered"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const statusOrder = validStatuses.indexOf(order.status);
    const statusNew = validStatuses.indexOf(status);

    if (statusNew <= statusOrder) {
      return res
        .status(400)
        .json({ message: `Cannot move to ${status} from ${order.status}` });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      updatedAt: new Date(),
    });
    await order.save();

    res
      .status(200)
      .json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalAmountTrnsationOnline = async (req, res) => {
  try {

    const orders = await Order.find();


    const totalAmount = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

    res.status(200).json({
      success: true,
      totalAmount, 
      // orders, 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};