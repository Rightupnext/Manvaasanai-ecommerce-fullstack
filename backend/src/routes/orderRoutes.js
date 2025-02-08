const express = require('express');
const { placeOrder} = require('../controllers/orderController');
const { isAuthenticated, allowRoles } = require('../middleware/AuthMiddleware');
const router = express.Router();

// Place order (User)
router.post('/create-order',isAuthenticated,  placeOrder);


module.exports = router;
