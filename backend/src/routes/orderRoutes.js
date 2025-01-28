const express = require('express');
const { placeOrder, updateOrderStatus, trackOrder } = require('../controllers/orderController');
const { isAuthenticated, allowRoles } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Place order (User)
router.post('/place', isAuthenticated, placeOrder);

// Update order status (Admin)
router.put('/update/:id', isAuthenticated, allowRoles('admin'), updateOrderStatus);

// Track order (Admin or User)
router.get('/track/:id', isAuthenticated, allowRoles('admin', 'user'), trackOrder);

module.exports = router;
