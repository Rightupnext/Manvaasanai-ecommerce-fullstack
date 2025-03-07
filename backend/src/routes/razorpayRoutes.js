const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/razorpayController");
const {isAuthenticated,allowRoles}=require('../middleware/AuthMiddleware')
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/status", verifyPayment);

module.exports = router;
