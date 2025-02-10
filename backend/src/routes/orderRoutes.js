const express = require('express');
const { placeOrder,getAllOrders,updateOrderStatus} = require('../controllers/orderController');
const { isAuthenticated, allowRoles } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Place order (User)
router.post('/create-order',isAuthenticated,  placeOrder);
// GET: Get order details by order id
router.get('/', getAllOrders);

// PUT: Update the status of the order
router.put('/status-update/:id/status', updateOrderStatus);

module.exports = router;
