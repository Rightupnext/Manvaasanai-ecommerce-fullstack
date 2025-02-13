require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes=require('./src/routes/orderRoutes');
const ShippingAndTax=require('./src/routes/ShippingAndTaxRoutes')
const razorpayRoutes = require("./src/routes/razorpayRoutes");
// Initialize App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/shipping-tax', ShippingAndTax);
app.use("/api/razorpay", razorpayRoutes);
// Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
