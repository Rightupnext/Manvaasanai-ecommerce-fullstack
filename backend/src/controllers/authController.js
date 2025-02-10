const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Orders = require('../models/orders');
const Product = require('../models/Product'); 
const SECRET_KEY = "your_secret_key";

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

    res.json({ 
      token,
      role: user.role // Sending the role in the response
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Forget Password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });

    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: `Click here to reset your password: http://localhost:3000/reset-password/${token}`,
    });

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Promote Role
exports.promoteRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = newRole;
    await user.save();

    res.json({ message: `User role updated to ${newRole}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID from the request

    console.log("User ID:", userId);

    // Query orders and populate product details
    const orders = await Orders.find({ user: userId })
      .populate({
        path: 'products.product', // Populating the product field inside each order's products
        select: 'title description price discountprice offer packSize available image category nutrients', // Select the necessary fields you want to include in the response
        populate: {
          path: 'category', // Optionally populate the category details if needed
          select: 'name' // Example: Select category name
        }
      })
      .exec();

    // Send the orders with populated product details in the response
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
