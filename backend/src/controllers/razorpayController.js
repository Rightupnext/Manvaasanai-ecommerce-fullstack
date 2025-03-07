const crypto = require("crypto");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const MERCHANT_KEY = process.env.MERCHANT_KEY;
const MERCHANT_ID =process.env.MERCHANT_ID;
const SALT_INDEX = process.env.SALT_INDEX;

const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status";

const redirectUrl = `${process.env.redirectUrl}/api/phonepe/status`;

// 🟢 Create Order (Production)
exports.createOrder = async (req, res) => {
  try {
    const { name, mobileNumber, amount } = req.body;

    const orderId = uuidv4();
    
    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantUserId: name,
      mobileNumber: mobileNumber,
      amount: amount * 100,
      merchantTransactionId: orderId,
      redirectUrl: `${redirectUrl}/?id=${orderId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString("base64");
    const string = payload + "/pg/v1/pay" + MERCHANT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + SALT_INDEX;

    const options = {
      method: "POST",
      url: MERCHANT_BASE_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payload },
    };

    const response = await axios.request(options);
    if (response.data.success) {
      return res.status(200).json({
        success: true,
        message: "Payment Initiated",
        orderId,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
      });
    } else {
      throw new Error(response.data.message || "Payment initiation failed");
    }
  } catch (error) {
    console.error("❌ Error in createOrder:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

// 🟢 Verify Payment (Production)
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: "Transaction ID is required" });
    }

    const string = `/pg/v1/status/${MERCHANT_ID}/${orderId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + SALT_INDEX;

    const options = {
      method: "GET",
      url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${orderId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": MERCHANT_ID,
      },
    };

    const response = await axios.request(options);

    if (response.data.success) {
      return res.status(200).json({
        success: true,
        message: "Payment Successful",
        transactionId: orderId,
        data: response.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
        transactionId: orderId,
        data: response.data,
      });
    }
  } catch (error) {
    console.error("❌ Error in verifyPayment:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
