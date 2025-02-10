const express = require('express');
const { register, login, forgetPassword, promoteRole,getUserOrders } = require('../controllers/authController');
const {isAuthenticated,allowRoles}=require('../middleware/AuthMiddleware')
const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.put('/promote-role', promoteRole);
router.get('/my-orders',isAuthenticated,allowRoles('admin','client'), getUserOrders);

module.exports = router;
