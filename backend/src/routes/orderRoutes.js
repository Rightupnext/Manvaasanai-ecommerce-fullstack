const express = require('express');
const { placeOrder,getAllOrders,updateOrderStatus} = require('../controllers/orderController');
const { isAuthenticated, allowRoles } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Place order (User)
router.post('/create-order',isAuthenticated,allowRoles('client','admin'), placeOrder);

router.get('/', getAllOrders);

// PUT: Update the status of the order
router.put('/status-update/:id/status', updateOrderStatus);

module.exports = router;
