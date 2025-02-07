const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // Verify token using secret from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Access the JWT secret from environment

    // Attach user to the request object
    req.user = await User.findById(decoded.id);

    // Check if user exists
    if (!req.user) return res.status(401).json({ message: 'User not found' });

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(500).json({ error: 'Token is not valid' });
  }
};



exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("User role:", req.user.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
