const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/razorpayController");
const {isAuthenticated,allowRoles}=require('../middleware/AuthMiddleware')
const router = express.Router();

router.post("/create-order",isAuthenticated, createOrder);
router.post("/verify-payment",isAuthenticated, verifyPayment);

module.exports = router;
