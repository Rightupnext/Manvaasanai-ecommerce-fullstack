const express = require('express');
const { placeOrder,getAllOrders,updateOrderStatus,getTotalAmountTrnsationOnline} = require('../controllers/orderController');
const { isAuthenticated, allowRoles } = require('../middleware/AuthMiddleware');
const router = express.Router();


router.post('/create-order',isAuthenticated,allowRoles('client','admin'), placeOrder);

router.get('/', getAllOrders);
router.get('/total-online-amount-trnsaction',isAuthenticated,allowRoles('admin'), getTotalAmountTrnsationOnline);

router.put('/status-update/:id/status', updateOrderStatus);

module.exports = router;
