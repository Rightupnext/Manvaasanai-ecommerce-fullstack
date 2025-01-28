const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = await User.findById(decoded.id);

    if (!req.user) return res.status(401).json({ message: 'User not found' });

    next();
  } catch (error) {
    res.status(500).json({ error: 'Token is not valid' });
  }
};

exports.allowRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
