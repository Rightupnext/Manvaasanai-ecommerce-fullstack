const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🟢 Create Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
console.log("razer amount",amount)
    const options = {
      amount: amount * 100, // Amount in paise (INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// 🟢 Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = hmac.digest("hex");

    if (digest === razorpay_signature) {
      res.json({ status: "success", payment_id: razorpay_payment_id });
    } else {
      res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error });
  }
};
