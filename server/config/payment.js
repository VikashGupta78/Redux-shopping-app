const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/order", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100,
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.post("/validate", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", key_secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ valid: true, message: "Payment verification successful" });
  } else {
    res.status(400).json({ valid: false, message: "Payment verification failed" });
  }
});

module.exports = router;
