require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Initialize Razorpay instance with API key and secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Route to create an order
app.post("/order", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
    currency,
    receipt, 
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // Send the order ID back to the frontend
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/validate", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;  
    
    const key_secret = process.env.RAZORPAY_KEY_SECRET;  // Make sure to set this in your .env file
  
    const hmac = crypto.createHmac("sha256", key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");
  
    if (generated_signature === razorpay_signature) {
        console.log("Payment signature verified!");
        res.json({
          valid: true,  // Change this from success to valid
          message: "Payment verification successful",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });
      } else {
        console.log("Payment signature mismatch.");
        res.status(400).json({
          valid: false,  // Send valid: false if the signature doesn't match
          message: "Payment verification failed"
        });
      }
  });

  app.get("/", (req, res) => {
    res.send("server is running fine")
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
